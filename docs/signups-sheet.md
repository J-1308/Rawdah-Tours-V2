# Sign-ups to a Google Sheet

The register-interest form (Hajj 2027, Ramadan, Umrah) can add every sign-up as a row in a Google Sheet that
Rawdah owns. There is no database on this site. Each sign-up is also emailed to Rawdah, with a confirmation to the
person, once Resend is set up (`docs/booking.md`).

## Set up (about ten minutes, done by Jibril or Rawdah)

1. Create a Google Sheet called "Rawdah sign-ups". In row 1 type these headings, one per column:
   `Received`, `Trip`, `Name`, `Email`, `Phone`, `Travellers`, `Travelling from`, `Message`, `Emails OK`, `Page`.
2. In the sheet: Extensions → Apps Script. Replace everything with the script below. Change `CHANGE-ME` to a long
   random password of your own.
3. Deploy → New deployment → type "Web app". Execute as: **Me**. Who has access: **Anyone**. Deploy, allow access,
   and copy the web app URL (it ends in `/exec`).
4. In Vercel (project `rawdah-tours-v2` → Settings → Environment Variables, Production), add:
   - `SIGNUPS_SHEET_URL` = the `/exec` URL
   - `SIGNUPS_SHEET_SECRET` = the same password as in the script
5. Redeploy. Send a test sign-up from the Hajj page and check the row appears.

```js
const SECRET = 'CHANGE-ME';

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  if (d.secret !== SECRET) return out({ ok: false });
  SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].appendRow([
    d.receivedAt, d.journey, d.name, d.email, "'" + d.phone, d.travellers,
    d.travellingFrom, d.message, d.marketingConsent ? 'Yes' : 'No', d.page,
  ]);
  return out({ ok: true });
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
```

Never put the password or the URL in the repo or in chat: only in Vercel.
