import { API } from "@/utils/api";

const baseURL = "https://api.github.com";

export const getUsers = async () => {
  const url = `${baseURL}/users`;

  return API({
    url,
    method: "get",
  });
};

export const getUserRepos = async ({ page, per_page, username }) => {
  const url = `${baseURL}/users/${username}/repos?page=${page}&per_page=${per_page}`;

  return API({
    url,
    method: "get",
  });
};

export const getLanguagesRepos = async ({ username, name }) => {
  console.log(params);
  const url = `${baseURL}/repos/${username}/${name}/languages`;

  return API({
    url,
    method: "get",
  });
};
