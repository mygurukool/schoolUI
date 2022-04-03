const setToken = (tokens, userId) => {
  const tkn = localStorage.setItem("tokens", JSON.stringify(tokens));
  const myuserId = localStorage.setItem("userId", userId);

  // const login = localStorage.setItem("loginTypes", JSON.stringify(loginTypes));

  return { token: tkn, userId: myuserId };
};
export default setToken;
