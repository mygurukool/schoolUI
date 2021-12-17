const getToken = (token) => {
  const tkn = localStorage.getItem(token || "token");
  const login = localStorage.getItem("loginType");

  // console.log("loginType hello", login);

  return { token: tkn, loginType: login };
};
export default getToken;
