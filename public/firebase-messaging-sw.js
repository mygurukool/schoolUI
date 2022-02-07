importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDBe5ragvjYZnn6XrboTbXr2BdHLi5bRlM",
  authDomain: "mygurukool-f9cf2.firebaseapp.com",
  projectId: "mygurukool-f9cf2",
  storageBucket: "mygurukool-f9cf2.appspot.com",
  messagingSenderId: "760394914033",
  appId: "1:760394914033:web:a2e2d3eeb1731038dfb150",
  measurementId: "G-561MWY14QQ",
};

// Initialize the Firebase app in the service worker by passing the generated config

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
