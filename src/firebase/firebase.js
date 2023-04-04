import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA_8CUqO1nCsQhYUVhRvgfRg_rHSGQ0g8s",
  authDomain: "push-notification-ababa.firebaseapp.com",
  projectId: "push-notification-ababa",
  storageBucket: "push-notification-ababa.appspot.com",
  messagingSenderId: "322276640641",
  appId: "1:322276640641:web:91a156da211bec3ca10a80",
  measurementId: "G-1B4Z8HVFQH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

const onMessageListener = () =>
  new Promise(resolve => {
    onMessage(messaging, payload => {
      console.log("payload", payload);
      resolve(payload);
    });
  });

const retrieveToken = () => {
  console.log("run retrieve token");
  return getToken(messaging, {
    vapidKey:
      "BM5Nxg5MyuleLyjh_xNPavrOqu_tacNFKWnDVQbAK3FY0gN1P8uFBvH7lXkI_IgStI5OjUUiWxSzR63-Bkdc0sE",
  })
    .then(currentToken => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one.",
        );
        // shows on the UI that permission is required
      }
    })
    .catch(err => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

const requestPermission = setIsFoundToken => {
  console.log("Requesting permission...");
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      console.log("Notification permission granted. Fetching Token");
      setIsFoundToken(true);
      // retrieveToken();
    } else {
      console.log(
        "Notification permission denied. Please allow notifications.",
      );
      setIsFoundToken(false);
    }
  });
};

export { app, messaging, onMessageListener, requestPermission, retrieveToken };
