const getToken = (token) => {
  const tkn = localStorage.getItem(token || "token");
  const login = localStorage.getItem("loginType");
  const userId = localStorage.getItem("userId");

  // console.log("loginType hello", login);

  return { token: tkn, loginType: login, userId };
};
export default getToken;
