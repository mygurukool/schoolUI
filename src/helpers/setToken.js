const setToken = (token, loginType) => {
  console.log(`saving token ${token}`);
  const tkn = localStorage.setItem("token", token);
  const login = localStorage.setItem("loginType", loginType || "mygurukool");

  return { token: tkn, loginType: login };
};
export default setToken;
