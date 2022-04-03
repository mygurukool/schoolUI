import React from "react";
import { useDispatch } from "react-redux";
import getToken from "../helpers/getToken";
import { getUserDetails, setLocalLogin } from "../redux/action/userActions";

const useAutoLogin = () => {
  const [ready, setReady] = React.useState(false);
  const dispatch = useDispatch();
  const { tokens, userId } = getToken();

  // console.log("loginType", loginType);

  React.useEffect(() => {
    if (tokens) {
      // console.log("token");
      // dispatch(setLocalLogin({ loginType }));
      dispatch(getUserDetails());

      setReady(true);
      return;
    } else {
      setReady(true);
    }
  }, [tokens]);
  return {
    ready,
    // token,
    // loginType,
  };
};

export default useAutoLogin;
