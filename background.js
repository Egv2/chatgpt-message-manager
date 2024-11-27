chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(null, (result) => {
    if (Object.keys(result).length === 0) {
      chrome.storage.sync.set({
        deleteTime: 24,
        messageLimit: 100,
        whitelistEmojis: "🔒",
        workDays: [1, 2, 3, 4, 5],
        startTime: "09:00",
        endTime: "17:00",
        notifications: true,
        deletedChatsCount: 0,
        protectedChatsCount: 0,
      });
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveSettings") {
    chrome.storage.sync.set(request.settings, () => {
      console.log("Ayarlar kaydedildi:", request.settings);
      sendResponse({ success: true });
    });
    return true;
  }
});

chrome.webNavigation.onCompleted.addListener(
  (details) => {
    if (details.url.includes("chat.openai.com")) {
      chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        files: ["content.js"],
      });
    }
  },
  {
    url: [
      {
        hostEquals: "chat.openai.com",
      },
    ],
  }
);
