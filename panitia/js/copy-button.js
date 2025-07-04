function copyContent() {
  const mainContent = document.getElementById("mainContent");
  const textToCopy = mainContent.innerText;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      // Show notification
      const notification = document.getElementById("copyNotification");
      notification.classList.add("show");

      // Hide notification after 2 seconds
      setTimeout(() => {
        notification.classList.remove("show");
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
      // Fallback method
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      // Show notification
      const notification = document.getElementById("copyNotification");
      notification.classList.add("show");

      setTimeout(() => {
        notification.classList.remove("show");
      }, 2000);
    });
}
