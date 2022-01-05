import { emailRegex } from "../constants/regex";

const validateEmail = (val) => {
  return val.match(emailRegex);
};

export default validateEmail;
