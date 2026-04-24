# Cookie Blaster

Cookie Blaster is a minimal Chrome extension that clears the cookies associated with the currently active page when you click the extension button.

## What It Does

- Works on the active tab when the URL uses `http` or `https`.
- Fetches all cookies for that page.
- Removes each cookie using its domain, path, protocol, and store ID.
- Shows a temporary badge result on the extension icon:
  - `Done` when cookies were cleared
  - `Err` when the operation failed
  - `N/A` when the current tab is not a normal web page

## How It Works

The background service worker listens for clicks on the extension action. When clicked, it:

1. Reads the current tab URL.
2. Rejects non-web pages such as browser internals or empty tabs.
3. Calls `chrome.cookies.getAll({ url })` to collect matching cookies.
4. Removes each cookie through `chrome.cookies.remove(...)`.
5. Updates the action badge with the result for 3 seconds.

## Permissions

The manifest currently requests:

- `cookies` to read and remove cookies
- `tabs` to inspect the active tab URL
- `host_permissions: ["<all_urls>"]` so the extension can operate on any site

## Project Layout

- `manifest.json` - Chrome Manifest V3 configuration
- `cookie-blaster.js` - background service worker logic
- `cooki-blaster48.png`, `cooki-blaster128.png`, `cookie-blaster.png` - icon assets currently checked into the repo

## Load Locally

To try the extension in Chrome:

1. Open `chrome://extensions`.
2. Enable Developer mode.
3. Click Load unpacked.
4. Select this repository folder.

## Current Repo Notes

The repository contains a couple of setup issues worth fixing before loading it as an unpacked extension:

- `manifest.json` does not currently include standard required metadata such as `name` and `version`.
- The manifest references `cookie-blaster48.png` and `cookie-blaster128.png`, but the files in the repo are named `cooki-blaster48.png` and `cooki-blaster128.png`.

Once those values are aligned, clicking the extension icon on any normal web page should clear that page's cookies.

## Development

There is no build step. This repo is plain JavaScript plus a Manifest V3 file, so changes can be tested by reloading the extension from `chrome://extensions`.