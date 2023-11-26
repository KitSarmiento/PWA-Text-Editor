const butInstall = document.getElementById("buttonInstall");
let deferredPrompt;
// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the browser's default install prompt
  event.preventDefault();
  // Store the event to trigger the prompt
  window.deferredPrompt = event;
  //show install button
  butInstall.style.display = "block";
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  if (window.deferredPrompt) {
    try {
      // Wait for the user to respond
      const choiceResult = await window.deferredPrompt.prompt();

      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }

      // Clear the deferredPrompt
      window.deferredPrompt = null;

      // Hide the install button.
      butInstall.style.display = "none";
    } catch (err) {
      console.error("Installation error:", err);
    }
  } else {
    console.log("No deferredPrompt available");
  }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("App installed:", event);
});
