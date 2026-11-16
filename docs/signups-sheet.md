# Sign-ups to a Google Sheet

The register-interest form (Hajj 2027, Ramadan, Umrah) can add every sign-up as a row in a Google Sheet that
Rawdah owns. There is no database on this site. Each sign-up is also emailed to Rawdah, with a confirmation to the
person, once Resend is set up (`docs/booking.md`).

## Set up (about ten minutes, done by Jibril or Rawdah)

1. Create a Google Sheet called "Rawdah sign-ups". In row 1 type these headings, one per column:
   `Received`, `Trip`, `Name`, `Email`, `Phone`, `Travellers`, `Travelling from`, `Message`, `Emails OK`, `Page`,
   `Source`, `Medium`, `Campaign`, `First page`, `Referrer`.
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
const ALERT_TO = 'rawdahtours@gmail.com'; // who gets the email for each new sign-up

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  if (d.secret !== SECRET) return out({ ok: false });
  SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].appendRow([
    d.receivedAt, d.journey, d.name, d.email, "'" + d.phone, d.travellers,
    d.travellingFrom, d.message, d.marketingConsent ? 'Yes' : 'No', d.page,
    d.utmSource, d.utmMedium, d.utmCampaign, d.landingPage, d.referrer,
  ]);
  // An instant email alert to Rawdah for every sign-up, sent from this Google account (no domain setup needed).
  MailApp.sendEmail({
    to: ALERT_TO,
    subject: 'New sign-up: ' + d.journey + ' - ' + d.name,
    body: [
      d.name + ' registered interest in ' + d.journey + '.',
      'Phone / WhatsApp: ' + d.phone,
      'Email: ' + d.email,
      'Travellers: ' + d.travellers + (d.travellingFrom ? ', from ' + d.travellingFrom : ''),
      d.message ? 'Message: ' + d.message : '',
      'Came from: ' + ([d.utmSource, d.utmMedium, d.utmCampaign].filter(String).join(' / ') || d.referrer || 'direct'),
      '',
      'Reply on WhatsApp: https://wa.me/' + String(d.phone).replace(/[^0-9]/g, '').replace(/^0/, '44'),
    ].filter(String).join('\n'),
  });
  return out({ ok: true });
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
```

Never put the password or the URL in the repo or in chat: only in Vercel.
