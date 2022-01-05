import React from "react";
import { useDispatch } from "react-redux";
import getToken from "../helpers/getToken";
import { getUserDetails, setLocalLogin } from "../redux/action/userActions";

const useAutoLogin = () => {
  const [ready, setReady] = React.useState(false);
  const dispatch = useDispatch();
  const { token, loginType } = getToken();

  // console.log("loginType", loginType);

  React.useEffect(() => {
    if (loginType === "google") {
      dispatch(setLocalLogin({ loginType }));
      dispatch(getUserDetails({ loginType: loginType }));
      setReady(true);
      return;
    } else if (token) {
      // console.log("token");
      dispatch(setLocalLogin({ loginType }));
      dispatch(getUserDetails({ loginType: loginType }));

      setReady(true);
      return;
    } else {
      setReady(true);
    }
  }, [token]);
  return {
    ready,
    token,
    loginType,
  };
};

export default useAutoLogin;
