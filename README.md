# Combat Creators — Hook Generator

## File Structure
```
combat-creators/
├── api/
│   ├── generate.js       ← backend, keeps API key secure
│   └── send-to-slack.js  ← posts scheduled hooks to Slack
├── index.html            ← the app (Generate + Content Calendar)
├── logo.png              ← your logo
└── vercel.json           ← deployment config
```

## Content Calendar + Slack

Generated hooks can be added to a Content Calendar (saved in your browser)
and pushed to a Slack channel with one click.

To enable Slack:
1. Create a Slack Incoming Webhook for the channel you want hooks posted to
   (Slack → your workspace → Apps → Incoming Webhooks → Add to Slack).
2. In Vercel: Settings → Environment Variables
   - Name: `SLACK_WEBHOOK_URL`
   - Value: the webhook URL Slack gave you
3. Save → Deployments → Redeploy

## Deploy to Vercel (5 minutes)

### 1. Push to GitHub
- Go to github.com → New repository → name it `combat-creators-hooks`
- Upload ALL files (drag and drop)
- Click Commit changes

### 2. Deploy on Vercel
- Go to vercel.com → sign up with GitHub
- Click Add New Project → select your repo → click Deploy

### 3. Add your API key
- In Vercel: Settings → Environment Variables
- Name: `ANTHROPIC_API_KEY`
- Value: your key from console.anthropic.com
- Save → Deployments → Redeploy

### 4. Share your link!
Your site will be live at something like:
`https://combat-creators-hooks.vercel.app`
