// name caching object in CacheStore
const CACHE_NAME = "my-cache";
// `install` event listener truy cap caches object va luu tru no voi list chung ta muon cache
// 1 di
self.addEventListener("install", (e) => {
  console.log("intalling service worker!!");
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // list of files which we need to cache such as css, html, json and bundled files
      return cache
        .addAll([`/`, "/index.html", "static/js/bundle.js"])
        .then(() => self.skipWaiting()); // when successfully return of promise of addAll operation
      //we are calling self.skipWaiting() is used to change service worker state from waiting to active
    })
  );
});

// check service worker will get activated or not
// take control of uncontrolled clients by calling clients.claim() within your service worker once it's activated

self.addEventListener("activate", (event) => {
  console.log("activating service worker");
  event.waitUntil(self.clients.claim());
});
// once a service worker controls a page, it can intercept every request that the page makes and decide that
//to do with the request. Every request's response we can match with our storage cache. If reponse
// of the request is already availabe in cache then we can return cached response otherwise we can
// cache new request's responses to our cached storage.
self.addEventListener("push", (e) => {
  const data = e.data?.json();
  if (data) {
    // use self.registration.showNotification() to show a notification using the message data
    self.registration.showNotification(data.title, {
      body: data.body,
    });
  }
});

// the notificationclick listener gets called when you click on the notification
self.addEventListener("notificationclick", (e) => {
  e.notification.close(); //close the notification
  e.waitUntil(focusOrOpenWindow());
});

async function focusOrOpenWindow() {
  const url = new URL("/", self.location.origin).href;
  const allWindows = await self.clients.matchAll({
    type: "window",
  });
  // if the user has an open tab application tab. If they do, focus it.
  const appWindow = allWindows.find((w) => w.url === url);
  if (appWindow) {
    return appWindow.focus();
  } else {
    // if they don't open a new window
    return self.clients.openWindow(url);
  }
}
