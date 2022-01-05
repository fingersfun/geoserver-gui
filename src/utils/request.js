import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.withCredentials = true;

const token = sessionStorage.getItem("token");

const request = async ({
  url,
  method,
  data,
  params,
  headers,
  auth,
  isJSON = true,
}) => {
  let requestHeaders = {};

  if (token) {
    requestHeaders["Authorization"] = `Token ${token}`;
  }

  if (typeof headers == "object" && headers != null && headers != undefined) {
    requestHeaders = Object.assign(requestHeaders, headers);
  }

  try {
    const response = await axios.request({
      baseURL: "",
      url,
      headers: requestHeaders,
      method,
      data,
      params,
      auth,
      transitional: {
        forcedJSONParsing: isJSON
      }
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response
    } else {
      return error.message;
    }
  }
};

export default request;
