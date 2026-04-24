chrome.action.onClicked.addListener(async (tab) => {
  try {
    const url = tab?.url;

    if (!url || !/^https?:\/\//.test(url)) {
      await setBadge("N/A", 3000);
      return;
    }

    const cookies = await chrome.cookies.getAll({ url });

    await Promise.all(
      cookies.map((cookie) =>
        chrome.cookies.remove({
          url: getCookieUrl(cookie),
          name: cookie.name,
          storeId: cookie.storeId,
        })
      )
    );

    await setBadge("Done", 3000);
  } catch (err) {
    console.error("failed to clear cookies:", err);
    await setBadge("Err", 3000);
  }
});

function getCookieUrl(cookie) {
  const protocol = cookie.secure ? "https:" : "http:";
  const domain = cookie.domain.startsWith(".")
    ? cookie.domain.slice(1)
    : cookie.domain;

  return `${protocol}//${domain}${cookie.path}`;
}

async function setBadge(text, ms) {
  await chrome.action.setBadgeText({ text });

  if (ms) {
    setTimeout(() => {
      chrome.action.setBadgeText({ text: "" });
    }, ms);
  }
}