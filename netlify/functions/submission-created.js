const { sendFormEmails } = require('../../lib/mailer');

exports.handler = async (event) => {
  try {
    const { payload } = JSON.parse(event.body);
    const d = payload.data;

    await sendFormEmails({
      name:        d.name              || '(not provided)',
      email:       d.email             || '(not provided)',
      phone:       d.phone             || '(not provided)',
      address:     d.address           || '(not provided)',
      junkDesc:    d['junk-desc']      || '(not provided)',
      service:     d.service           || '',
      loadSize:    d['load-size']      || '',
      preferred:   d['preferred-date'] || '',
      formName:    payload.form_name,
      submittedAt: new Date(payload.created_at).toLocaleString('en-US', {
        timeZone: 'America/New_York',
        dateStyle: 'full',
        timeStyle: 'short',
      }),
    });

    return { statusCode: 200, body: 'OK' };
  } catch (err) {
    console.error('submission-created error:', err);
    return { statusCode: 500, body: 'Error sending email' };
  }
};
 