const getToken = () => {
  const tkn = localStorage.getItem("tokens");
  const myUserId = localStorage.getItem("userId");

  // const login = localStorage.getItem("loginTypes");

  return { tokens: tkn, userId: myUserId };
};
export default getToken;
