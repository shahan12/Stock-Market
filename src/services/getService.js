import axios from "axios";

export const getService = (url) => {
  return axios
    .get(`${url}`)
    .then((response) => response)
    .catch((e) => {
      console.log("Api response out of 200", e);
    });
};
