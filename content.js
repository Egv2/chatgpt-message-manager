let retryCount = 0;
const maxRetries = 10;

function waitForElement(selector, callback, interval = 1000) {
  const element = document.querySelector(selector);

  if (element) {
    callback(element);
    return;
  }

  if (retryCount < maxRetries) {
    retryCount++;
    setTimeout(() => {
      waitForElement(selector, callback, interval);
    }, interval);
  }
}

window.addEventListener("load", () => {
  waitForElement("nav[aria-label='Chat history']", (element) => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length) {
          initializeExtension();
        }
      }
    });

    observer.observe(element, {
      childList: true,
      subtree: true,
    });
  });
});
