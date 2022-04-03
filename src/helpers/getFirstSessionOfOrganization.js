const getFirstSessionOfOrganization = () => {
  return window.sessionStorage.getItem("isFirstSession");
};
export default getFirstSessionOfOrganization;
