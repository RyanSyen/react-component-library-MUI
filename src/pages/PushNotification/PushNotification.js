/* eslint-disable import/no-extraneous-dependencies */
// Import the functions you need from the SDKs you need
// eslint-disable-next-line import/no-extraneous-dependencies
import { useEffect, useRef, useState } from "react";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import {
  app,
  messaging,
  onMessageListener,
  requestPermission,
  retrieveToken,
} from "../../firebase/firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// const messaging = getMessaging(app);

const PushNotification = () => {
  //   const isFoundToken = useRef(false);
  const [isFoundToken, setIsFoundToken] = useState(false);
  const isRendered = useRef(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isRendered.current) {
      retrieveToken();
      requestPermission(setIsFoundToken);
      isRendered.current = true;
    }
  }, []);

  onMessageListener()
    .then(payload => {
      console.log(payload);
      setNotification({
        title: `${payload?.notification?.title} front`,
        body: payload?.notification?.body,
      });
      setShow(true);
    })
    .catch(err => console.log("failed: ", err));

  return (
    <>
      {isFoundToken && <div>Notification permission enabled 👍🏻 </div>}
      {!isFoundToken && <div>Need notification permission ❗️ </div>}
      {show && (
        <div>
          <p>{notification.title}</p>
          <p>{notification.body}</p>
        </div>
      )}
    </>
  );
};

export default PushNotification;
