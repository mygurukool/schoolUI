const setToken = (token, loginType, uId) => {
  console.log(`saving token ${token}`);
  const tkn = localStorage.setItem("token", token);
  const login = localStorage.setItem("loginType", loginType);
  const userId = localStorage.setItem("userId", uId);

  return { token: tkn, loginType: login, userId };
};
export default setToken;
