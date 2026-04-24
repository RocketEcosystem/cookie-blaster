# Cookie Blaster

A minimal extension to rid you of your cookie burdens during development. Or just when you're really fucken tired of clearing them just to read "one more article" on a site.

Install then click the cookie when you desire absolution.

Attribution: this is a reworked and updated version of <a href="https://github.com/nestoru/remove-cookies-for-site">remove-cookies-for-site</a> by fellow cookie abolitionist <a href="https://github.com/nestoru">nestoru</a> (thanks lil buddy).

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

## Development

There is no build step. This repo is plain JavaScript plus a Manifest V3 file, so changes can be tested by reloading the extension from `chrome://extensions`.