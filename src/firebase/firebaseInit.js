import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import "firebase/messaging";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBe5ragvjYZnn6XrboTbXr2BdHLi5bRlM",
  authDomain: "mygurukool-f9cf2.firebaseapp.com",
  projectId: "mygurukool-f9cf2",
  storageBucket: "mygurukool-f9cf2.appspot.com",
  messagingSenderId: "760394914033",
  appId: "1:760394914033:web:a2e2d3eeb1731038dfb150",
  measurementId: "G-561MWY14QQ",
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const getFirebaseToken = (cb) => {
  getToken(messaging, {
    vapidKey:
      "BAijllk_bh60wxkRK4vduSkBQciebsHt8wt4d4acWOnMNjdkxE9a-0Dw-LWM_jBmtNHVBxRCPKNkS53Z95je80I",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        cb(currentToken);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // setTokenFound();
        alert("No Token found");
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};
export const onFirebaseMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
