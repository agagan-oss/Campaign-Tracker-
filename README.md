# Campaign Tracker

An interactive campaign tracker built with React + Vite. All changes are automatically saved to your browser's localStorage, so your data persists between sessions.

## Features
- ✅ Auto-saves every change to localStorage
- ✅ Add, edit, and delete campaigns
- ✅ Mark campaigns as checked (individually or all at once)
- ✅ Filter by status, platform, or search keyword
- ✅ Sort by any column
- ✅ Export / Import JSON backups
- ✅ Color-coded platforms and statuses
- ✅ End date countdown with urgency indicators

---

## Setup: Deploy to GitHub Pages (step-by-step)

### Step 1 — Create a GitHub account
Go to [github.com](https://github.com) and sign up if you don't have an account.

### Step 2 — Create a new repository
1. Click the **+** icon in the top right → **New repository**
2. Name it `campaign-tracker`
3. Set it to **Public**
4. Click **Create repository**

### Step 3 — Upload these files
1. On your new repo page, click **uploading an existing file**
2. Drag and drop ALL the files and folders from this zip
3. Click **Commit changes**

### Step 4 — Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages** (left sidebar)
2. Under **Source**, select **GitHub Actions**
3. Click **Save**

### Step 5 — Wait for deployment (~1-2 minutes)
1. Go to the **Actions** tab in your repo
2. You'll see a workflow running — wait for the green checkmark
3. Your site will be live at: `https://YOUR-USERNAME.github.io/campaign-tracker/`

---

## Making changes in the future

### To update your campaign data
The tracker auto-saves to your browser. To back up or share your data:
1. Click **Export JSON** in the app
2. Save the file somewhere safe
3. Use **Import JSON** on any browser to restore it

### To change the code (colors, features, etc.)
1. Edit the files directly on GitHub (click any file → pencil icon ✏️)
2. Commit your changes
3. GitHub Actions will automatically rebuild and redeploy in ~1-2 minutes

### Important: Update the repo name in vite.config.js
If you named your repo something other than `campaign-tracker`, update line 6 of `vite.config.js`:
```js
base: '/YOUR-REPO-NAME/',
```

---

## Local development (optional)
```bash
npm install
npm run dev
```
