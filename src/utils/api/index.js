import axios from "axios";

export const API = async ({ url, method }) => {
  const response = await axios({ url, method }).catch((err) => err.response);

  if (response.status > 300) {
    const res = {
      error: true,
      message: response.data.message,
      data: null,
    };
    return res;
  }

  const res = {
    error: false,
    message: "success",
    data: response.data,
  };

  return res;
};
