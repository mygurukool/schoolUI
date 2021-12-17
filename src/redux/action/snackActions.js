export const hideSnackBar = (data) => {
  return {
    type: "HIDE_SNACKBAR",
  };
};

export const showSnackBar = (data, severnity) => {
  return {
    type: "SHOW_SNACKBAR",
    payload: {
      data: data,
      severity: severnity || "success",
    },
  };
};
