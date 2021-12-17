import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../redux/action/userActions";
import { useTranslation } from "react-i18next";
// import { getUserDetails } from "../redux/action/employeeActions";
import getToken from "./getToken";

function useFriendStatus(friendID) {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  const delayReady = () => {
    setReady(true);
  };
  const { t, i18n, ready: detectReady } = useTranslation();

  const detectLanguage = () => {
    if (detectReady) {
      setReady(true)
    } else {
      setReady(false)
    }
  }

  function handleCheckToken() {
    const tkn = getToken();
    detectLanguage()
    if (tkn) {
      dispatch(getUserDetails())
      delayReady(true);
    } else {
      delayReady(true);
    }
  }
  useEffect(() => {
    handleCheckToken();
  }, []);

  return ready;
}
export default useFriendStatus;