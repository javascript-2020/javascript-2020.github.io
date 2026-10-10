// Listen for all network requests before they are sent
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    console.log("🌐 [Request Intercepted]:", {
      method: details.method,
      url: details.url,
      type: details.type, // e.g., 'xmlhttprequest', 'script', 'image', 'main_frame'
      tabId: details.tabId,
      timeStamp: new Date(details.timeStamp).toISOString()
    });
  },
  { urls: ["<all_urls>"] }
);
