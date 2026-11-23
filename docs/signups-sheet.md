# Bookings and sign-ups in a Google Sheet

The site can add every booking request and sign-up to a Google Sheet, through a small Google Apps Script web app
attached to the sheet. There is no database on this site. It is off until `SIGNUPS_SHEET_URL` and
`SIGNUPS_SHEET_SECRET` are set in Vercel. Rawdah is emailed about each one by Resend (`docs/booking.md`), so the
script sends no email of its own.

## The sheet

"Rawdah Tours bookings", in Jibril's Google Drive (created 21 Nov 2026). Three tabs:

- **Bookings:** one row per booking request from the Ramadan page (`bookingSheetRow` in
  `src/lib/server/booking-request.ts`). Received, Reference (RT-…), Status, Name, WhatsApp, Email, Package,
  Travellers, Sharing a room with, Price per person, Total, Deposit due, Paid so far, Balance, Payment plan (per
  person), Came from, Notes. The money comes from the server's price list (`src/lib/trips.ts`). Every new booking
  arrives as **New**. The team fills in Status (a dropdown: New, Contacted, Deposit paid, Paid in full, Cancelled),
  Paid so far and Notes. Balance is a formula: Total minus Paid so far. Cancelled rows are struck through.
- **Summary:** formulas over Bookings: booking requests, travellers, booked value, paid so far and still to pay
  (cancelled bookings left out), and a count by status.
- **Leads:** every step-by-step form when it is started and when it is finished, and every register-interest
  sign-up. Columns: Received, Form and trip, Name, Email, Phone, Travellers, Travelling from, Answers, Emails OK,
  Page, Source, Medium, Campaign, First page, Referrer. A finished booking request goes to Bookings, not here.

The script finds the tabs by name, so keep the names "Bookings" and "Leads". Columns can be widened or coloured, but
add new columns only after column Q (Notes) on Bookings, or the rows will land in the wrong columns.

## Connect it (about ten minutes, done by Jibril or Rawdah)

1. Open the sheet. Extensions → Apps Script. Delete what is there and paste the script below.
2. Change `CHANGE-ME` to a long random password of your own (30 or more letters and numbers). Save.
3. Deploy → New deployment → the gear → Web app. Execute as: **Me**. Who has access: **Anyone**. Deploy, allow
   access when Google asks, and copy the web app URL (it ends in `/exec`).
4. In Vercel (project `rawdah-tours-v2` → Settings → Environment Variables, Production and Preview), add:
   - `SIGNUPS_SHEET_URL` = the `/exec` URL
   - `SIGNUPS_SHEET_SECRET` = the same password as in the script
5. Redeploy the site (Deployments → the latest → Redeploy). Send a test booking from the Ramadan page with your own
   details, check the row appears on Bookings, then set its Status to Cancelled or delete the row.

If you change the script later, use Deploy → Manage deployments → edit → New version, so the URL stays the same.

Never put the password or the URL in the repo or in chat: only in the script and in Vercel.

```js
// Rawdah Tours bookings: the website sends each booking request and sign-up here (docs/signups-sheet.md).
const SECRET = 'CHANGE-ME'; // the same long password as SIGNUPS_SHEET_SECRET in Vercel

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  if (d.secret !== SECRET) return out({ ok: false });
  const lock = LockService.getScriptLock();
  lock.waitLock(20000); // two forms sent at the same moment each get their own row
  try {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const when = d.receivedAt ? new Date(d.receivedAt) : new Date();
    if (d.kind === 'booking') {
      const sheet = book.getSheetByName('Bookings');
      const r = sheet.getLastRow() + 1;
      sheet.getRange(r, 1, 1, 17).setValues([clean([
        when, d.reference, 'New', d.name, asText(d.whatsapp), d.email, d.package, d.travellers, d.sharing,
        d.pricePerPerson, d.total, d.depositDue, '', '', d.plan, d.came, '',
      ])]);
      sheet.getRange(r, 14).setFormula('=IF(K' + r + '="","",K' + r + '-M' + r + ')'); // Balance
    } else {
      book.getSheetByName('Leads').appendRow(clean([
        when, d.journey, d.name, d.email, asText(d.phone), d.travellers, d.travellingFrom, d.message,
        d.marketingConsent ? 'Yes' : 'No', d.page, d.utmSource, d.utmMedium, d.utmCampaign, d.landingPage, d.referrer,
      ]));
    }
  } finally {
    lock.releaseLock();
  }
  return out({ ok: true });
}

// A leading apostrophe keeps a phone number as text, so its first 0 stays.
function asText(v) { return v ? "'" + v : ''; }

// Empty cells for anything the form left out. Text that starts with = + - or @ gets a leading apostrophe, so
// something typed into the form (a name such as "=HYPERLINK(...)") is shown as text and never runs as a formula.
function clean(row) {
  return row.map(function (v) {
    if (v === undefined || v === null) return '';
    return typeof v === 'string' && /^[=+\-@]/.test(v) ? "'" + v : v;
  });
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
```
