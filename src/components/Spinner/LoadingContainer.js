import React from "react";
import CustomLoading from "./CustomLoading";

const LoadingContainer = ({ isLoading, children }) => {
  return isLoading ? <CustomLoading /> : children;
};

export default LoadingContainer;
