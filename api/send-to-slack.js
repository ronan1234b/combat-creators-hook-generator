// Posts a content-calendar entry to Slack via an Incoming Webhook.
// Keeps the webhook URL server-side so it never ships to the browser.
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    res.status(500).json({ error: 'SLACK_WEBHOOK_URL is not configured' });
    return;
  }

  const { date, hookText, why, formatting } = req.body || {};
  if (!hookText) {
    res.status(400).json({ error: 'hookText is required' });
    return;
  }

  const lines = [
    `*New content calendar hook${date ? ` — ${date}` : ''}*`,
    `> ${hookText}`
  ];
  if (why) lines.push(`*Why:* ${why}`);
  if (formatting) lines.push(`*Format:* ${formatting}`);

  try {
    const slackRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: lines.join('\n') })
    });

    if (!slackRes.ok) {
      const body = await slackRes.text().catch(() => '');
      res.status(502).json({ error: 'Slack rejected the message: ' + body });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Failed to reach Slack: ' + e.message });
  }
};
