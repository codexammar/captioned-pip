// background.js

browser.action.onClicked.addListener((tab) => {
    browser.tabs.sendMessage(tab.id, { action: "start_captioned_pip" });
  });
  