const nodemailer = require('nodemailer');

// ── Shared style constants ──────────────────────────────────────────────────
const tdLabel = 'padding:10px 14px;background:#f5f7fa;font-weight:600;color:#555;font-size:14px;width:140px;border-bottom:1px solid #e8ecf0;';
const tdValue = 'padding:10px 14px;color:#1a1a2e;font-size:14px;border-bottom:1px solid #e8ecf0;';

// ── Owner email template ────────────────────────────────────────────────────
const ownerTemplate = ({ name, email, phone, address, junkDesc, submittedAt, formName, extraRows }) => `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
</head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:Inter,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.10);">

        <!-- Header -->
        <tr>
          <td style="background:#1e73be;padding:28px 32px;text-align:center;">
            <p style="margin:0;font-size:13px;color:rgba(255,255,255,.75);letter-spacing:.08em;text-transform:uppercase;">J&amp;J Pickup</p>
            <h1 style="margin:6px 0 0;color:#fff;font-size:22px;font-weight:700;">New Quote Request</h1>
            <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,.8);">Form: <strong>${formName}</strong> &nbsp;&middot;&nbsp; ${submittedAt}</p>
          </td>
        </tr>

        <!-- Alert bar -->
        <tr>
          <td style="background:#2ecc71;padding:10px 32px;text-align:center;">
            <p style="margin:0;color:#fff;font-size:13px;font-weight:600;"><i class="fa fa-bolt" style="margin-right:6px;"></i>Reply within 1 hour to beat competitors &mdash; hit Reply to go straight to the customer.</p>
          </td>
        </tr>

        <!-- Details table -->
        <tr>
          <td style="padding:28px 32px 8px;">
            <h2 style="margin:0 0 16px;font-size:16px;color:#1a1a2e;font-weight:700;">Customer Details</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:6px;overflow:hidden;border:1px solid #e8ecf0;">
              <tr><td style="${tdLabel}">Name</td><td style="${tdValue}">${name}</td></tr>
              <tr><td style="${tdLabel}">Phone</td><td style="${tdValue}"><a href="tel:${phone}" style="color:#1e73be;">${phone}</a></td></tr>
              <tr><td style="${tdLabel}">Email</td><td style="${tdValue}"><a href="mailto:${email}" style="color:#1e73be;">${email}</a></td></tr>
              <tr><td style="${tdLabel}">Pickup Address</td><td style="${tdValue}">${address}</td></tr>
              ${extraRows}
              <tr><td style="${tdLabel}">Junk Description</td><td style="${tdValue}">${junkDesc}</td></tr>
            </table>
          </td>
        </tr>

        <!-- CTA buttons -->
        <tr>
          <td style="padding:24px 32px;">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right:12px;">
                  <a href="tel:${phone}" style="display:inline-block;background:#2ecc71;color:#fff;text-decoration:none;padding:12px 24px;border-radius:6px;font-weight:700;font-size:14px;"><i class="fa fa-phone" style="margin-right:8px;"></i>Call Now</a>
                </td>
                <td>
                  <a href="mailto:${email}" style="display:inline-block;background:#1e73be;color:#fff;text-decoration:none;padding:12px 24px;border-radius:6px;font-weight:700;font-size:14px;"><i class="fa fa-envelope" style="margin-right:8px;"></i>Reply by Email</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f5f7fa;padding:18px 32px;text-align:center;border-top:1px solid #e8ecf0;">
            <p style="margin:0;font-size:12px;color:#999;">This notification was sent from your J&amp;J Pickup website contact form.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

// ── Customer confirmation template ──────────────────────────────────────────
const customerTemplate = ({ name, email, phone, address, junkDesc, submittedAt, extraRows }) => `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
</head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:Inter,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.10);">

        <!-- Header -->
        <tr>
          <td style="background:#1e73be;padding:32px;text-align:center;">
            <p style="margin:0;font-size:40px;color:#fff;"><i class="fa fa-truck"></i></p>
            <h1 style="margin:10px 0 4px;color:#fff;font-size:22px;font-weight:700;">We Got Your Request, ${name}!</h1>
            <p style="margin:0;color:rgba(255,255,255,.85);font-size:14px;">J&amp;J Pickup &middot; Greensboro, NC &middot; ${submittedAt}</p>
          </td>
        </tr>

        <!-- Intro -->
        <tr>
          <td style="padding:28px 32px 8px;">
            <p style="margin:0 0 20px;font-size:16px;color:#1a1a2e;line-height:1.6;">
              Thanks for reaching out! We&rsquo;ve received your quote request and will get back to you
              <strong style="color:#1e73be;">within 1 hour</strong> during business hours.
            </p>

            <!-- Detail table -->
            <h2 style="margin:0 0 16px;font-size:16px;color:#1a1a2e;font-weight:700;">Your Submission Details</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:6px;overflow:hidden;border:1px solid #e8ecf0;">
              <tr><td style="${tdLabel}">Name</td><td style="${tdValue}">${name}</td></tr>
              <tr><td style="${tdLabel}">Phone</td><td style="${tdValue}">${phone}</td></tr>
              <tr><td style="${tdLabel}">Email</td><td style="${tdValue}">${email}</td></tr>
              <tr><td style="${tdLabel}">Pickup Address</td><td style="${tdValue}">${address}</td></tr>
              ${extraRows}
              <tr><td style="${tdLabel}">Junk Description</td><td style="${tdValue}">${junkDesc}</td></tr>
            </table>
          </td>
        </tr>

        <!-- Hours -->
        <tr>
          <td style="padding:24px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#e8f4fd;border-left:4px solid #1e73be;border-radius:0 6px 6px 0;margin:0 0 24px;">
              <tr><td style="padding:14px 18px;">
                <p style="margin:0;font-size:14px;color:#1a4a7a;line-height:1.6;">
                  <strong>Business Hours:</strong><br>
                  Mon &ndash; Fri: 7:00 AM &ndash; 7:00 PM<br>
                  Saturday: 8:00 AM &ndash; 5:00 PM<br>
                  Sunday: Closed
                </p>
              </td></tr>
            </table>

            <p style="margin:0 0 20px;font-size:14px;color:#555;line-height:1.6;">
              Need to reach us sooner? Give us a call &mdash; we&rsquo;re ready to help:
            </p>

            <table cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <a href="tel:+13365550100" style="display:inline-block;background:#2ecc71;color:#fff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:700;font-size:15px;"><i class="fa fa-phone" style="margin-right:8px;"></i>Call J&amp;J Pickup</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f5f7fa;padding:20px 32px;text-align:center;border-top:1px solid #e8ecf0;">
            <p style="margin:0 0 4px;font-size:13px;color:#777;">J&amp;J Pickup &mdash; Greensboro, NC</p>
            <p style="margin:0;font-size:12px;color:#aaa;">You&rsquo;re receiving this because you submitted a quote request on jjpickup.com.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

// ── Send both emails ────────────────────────────────────────────────────────
async function sendFormEmails({ name, email, phone, address, junkDesc, service, loadSize, preferred, formName, submittedAt }) {
  const transporter = nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port:   parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const extraRows = [
    service   && `<tr><td style="${tdLabel}">Service Type</td><td style="${tdValue}">${service}</td></tr>`,
    loadSize  && `<tr><td style="${tdLabel}">Load Size</td><td style="${tdValue}">${loadSize}</td></tr>`,
    preferred && `<tr><td style="${tdLabel}">Preferred Date</td><td style="${tdValue}">${preferred}</td></tr>`,
  ].filter(Boolean).join('');

  await transporter.sendMail({
    from:    `"J&J Pickup Website" <${process.env.SMTP_USER}>`,
    to:      process.env.OWNER_EMAIL,
    replyTo: email,
    subject: `[New Quote] Quote Request from ${name}`,
    html:    ownerTemplate({ name, email, phone, address, junkDesc, submittedAt, formName, extraRows }),
  });

  if (email && email !== '(not provided)') {
    await transporter.sendMail({
      from:    `"J&J Pickup" <${process.env.SMTP_USER}>`,
      to:      email,
      subject: 'We received your junk removal quote request!',
      html:    customerTemplate({ name, email, phone, address, junkDesc, submittedAt, extraRows }),
    });
  }
}

module.exports = { sendFormEmails };
