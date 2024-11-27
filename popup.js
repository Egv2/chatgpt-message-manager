document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.sync.get(
    [
      "workDays",
      "startTime",
      "endTime",
      "notifications",
      "messageLimit",
      "deleteTime",
      "whitelistEmojis",
    ],
    function (result) {
      if (result.workDays) {
        const days = document.querySelectorAll(".days-selector input");
        result.workDays.forEach((day) => {
          days[day].checked = true;
        });
      }

      if (result.startTime) {
        document.getElementById("startTime").value = result.startTime;
      }
      if (result.endTime) {
        document.getElementById("endTime").value = result.endTime;
      }

      if (result.notifications !== undefined) {
        document.getElementById("notifications").checked = result.notifications;
      }

      if (result.messageLimit) {
        document.getElementById("messageLimit").value = result.messageLimit;
      }
      if (result.deleteTime) {
        document.getElementById("deleteTime").value = result.deleteTime;
      }
      if (result.whitelistEmojis) {
        const tags = result.whitelistEmojis.split(",");
        tags.forEach((tag) => {
          if (tag.trim()) {
            addWhitelistTag(tag.trim());
          }
        });
        console.log("Loaded whitelist tags:", tags);
      }
    }
  );

  document
    .getElementById("whitelistInput")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter" && this.value.trim()) {
        addWhitelistTag(this.value.trim());
        this.value = "";
      }
    });

  document
    .getElementById("saveSettings")
    .addEventListener("click", function () {
      const settings = {
        workDays: Array.from(
          document.querySelectorAll(".days-selector input:checked")
        ).map((checkbox) => parseInt(checkbox.value)),
        messageLimit:
          parseInt(document.getElementById("messageLimit").value) || 100,
        deleteTime: parseInt(document.getElementById("deleteTime").value) || 24,
        startTime: document.getElementById("startTime").value,
        endTime: document.getElementById("endTime").value,
        notifications: document.getElementById("notifications").checked,
        whitelistEmojis: Array.from(document.querySelectorAll(".tag"))
          .map((tag) => tag.textContent.replace("×", "").trim())
          .filter((tag) => tag)
          .join(","),
      };

      chrome.runtime.sendMessage(
        { action: "saveSettings", settings: settings },
        function (response) {
          if (response && response.success) {
            showNotification("Ayarlar başarıyla kaydedildi!");
          }
        }
      );
    });
});

function showNotification(message) {
  if (Notification.permission === "granted") {
    new Notification("ChatGPT Mesaj Yöneticisi", {
      body: message,
      icon: "icon48.png",
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        showNotification(message);
      }
    });
  }
}

function addWhitelistTag(text) {
  const tagsContainer = document.getElementById("whitelistTags");
  const tag = document.createElement("span");
  tag.className = "tag";
  tag.innerHTML = `${text}<span class="tag-remove">×</span>`;

  tag.querySelector(".tag-remove").addEventListener("click", function () {
    tag.remove();
    saveWhitelistTags();
  });

  tagsContainer.appendChild(tag);
  saveWhitelistTags();
}

function saveWhitelistTags() {
  const whitelistTags = Array.from(document.querySelectorAll(".tag"))
    .map((tag) => tag.textContent.replace("×", "").trim())
    .filter((tag) => tag)
    .join(",");

  chrome.storage.sync.set(
    {
      whitelistEmojis: whitelistTags,
    },
    function () {
      console.log("Whitelist tags saved:", whitelistTags);
    }
  );
}
