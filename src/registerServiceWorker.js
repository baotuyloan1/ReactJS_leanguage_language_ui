export default function registerServiceWorker() {
  console.log(navigator);

  // if ("serviceWorker" in navigator) {
  //   window.addEventListener("load", () => {
  //     navigator.serviceWorker
  //       .register("./service-worker.js")
  //       .then((registration) => {
  //         console.log("Service Worker registered:", registration);
  //       })
  //       .catch((error) => {
  //         console.error("Service Worker registration failed:", error);
  //       });
  //   });
  // }
}