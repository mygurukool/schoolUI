const removeToken = (token) => {
  const tkn = localStorage.removeItem("token");
  const removeToken = localStorage.removeItem("loginType");

  return tkn;
};
export default removeToken;
