import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import getToken from "../helpers/getToken";
import { BASEURL } from "../constants/index";
import { showSnackBar } from "./action/snackActions";
// import getToken from './src/functions/getToken';
// import {showerror, showDomainError} from './src/actions/userActions';

const getErrorMessage = (error) => {
  return typeof error?.response?.data?.message === "string"
    ? error?.response?.data?.message
    : undefined;
};

const options = {
  returnRejectedPromiseOnError: true,
  interceptors: {
    request: [
      ({ getState, dispatch, getSourceAction }, request) => {
        // dispatch({ type: "SPINNER_START" });

        return request;
      },
    ],
    response: [
      {
        success: ({ getState, dispatch, getSourceAction }, response) => {
          let sourceAction = getSourceAction(response.config);

          if (sourceAction?.payload?.enableMessage) {
            const succMessage = (res) =>
              response.data.message || sourceAction?.payload?.successMessage;
            if (succMessage()) {
              dispatch(showSnackBar(succMessage(), "success"));
            }
          }
          if (sourceAction?.payload?.cb) {
            sourceAction?.payload?.cb(response);
          }
          // console.log('acc', response);
          dispatch({ type: "SPINNER_STOP" });

          return response;
        },
        error: ({ getState, dispatch, getSourceAction }, error) => {
          let sourceAction = getSourceAction(error.config);
          if (sourceAction?.payload?.enableMessage) {
            const errMessage = () => {
              if (getErrorMessage(error)) {
                return getErrorMessage(error);
              }
              return sourceAction?.payload?.errorMessage;
            };

            if (errMessage()) {
              dispatch(showSnackBar(errMessage(), "error"));
            }
          }

          if (sourceAction?.payload?.errorCb) {
            sourceAction?.payload?.errorCb(error);
          }

          dispatch({ type: "SPINNER_STOP" });

          if (error.message === "Network Error") {
            dispatch(
              showSnackBar(
                "Network Error, Please check your internet connection or contact developer",
                "error"
              )
            );
          }
          return Promise.reject(error);
        },
      },
    ],
  },
};
// https://github.com/svrcekmichal/redux-axios-middleware
// https://github.com/axios/axios
const client = axios.create({
  baseURL: BASEURL,
  // baseURL: 'http://147.139.46.166:3000',
  // baseURL: 'http://45.79.125.58:3005',
  // responseType: 'json',
  // transformResponse: [
  //   (data) => {
  //     // Do whatever you want to transform the data
  //     return data;
  //   },
  // ],
});
// Set the AUTH token for any request
client.interceptors.request.use(async (config) => {
  // let domain = await getDomain().then(res => res);
  // if (domain) {
  //   config.baseURL = domain;
  // }

  let { token, loginType } = getToken();

  if (token) {
    config.headers["Authorization"] = `${token}`;
    config.headers["LoginType"] = `${loginType}`;

    // config.headers['Content-Type'] = `application/json`;
  }

  return config;
});
export default axiosMiddleware(client, options);

// import axios from "axios";
// import axiosMiddleware from "redux-axios-middleware";

// const options = {
//   returnRejectedPromiseOnError: true,
//   interceptors: {
//     request: [
//       ({ getState, dispatch }, config) => {
//         // Request interception
//         return config;
//       },
//     ],
//     response: [
//       {
//         success: ({ getState, dispatch, getSourceAction }, response) => {
//           // console.log("AXIOS Response :", response); //contains information about request object
//           //...
//           return response;
//         },
//         error: ({ getState, dispatch, getSourceAction }, error) => {
//           // console.log("AXIOS ERR :", error); //contains information about request object
//           //...
//           return Promise.reject(error);
//         },
//       },
//     ],
//   },
// };

// const client = axios.create({
//   // baseURL: "http://127.0.0.1:43553",
//   responseType: "json",
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//   },
// headers: {
//   "Access-Control-Allow-Origin": "*",
//   "Content-Type": "application/json",
// },

//   transformResponse: [
//     (data) => {
//       // Do whatever you want to transform the data
//       // console.log("AXIOS CLIENT RESPONSE :", data);
//       return data;
//     },
//   ],
// });

// export default axiosMiddleware(client, options);
