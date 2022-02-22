import axios from "axios";
import config from "../../config";
import auth from "../containers/auth";
import { history } from "../store";
import {getJsonCookies } from './utility';

const customHeader = (headers) => ({
  Authorization: getJsonCookies() || undefined,
  ...headers
});

export function api(headers) {
  let opts = {
    baseURL: config.api.trim(),
    headers: customHeader(headers),
  };
  return axios.create(opts);
}

export function api2() {
  let opts = {
    baseURL: "https://int.queenofraw.com/rest/default/",
    headers: {
      Authorization: "Bearer vb768g6v81sv27kymj5ho4tlran3eu94",
      "Content-Type": "text/plain"
    },
  };
  return axios.create(opts);
}

export function catchHandler(e) {
  let res = JSON.parse(JSON.stringify(e)).response;
  if (res && res.status === 401) {
    auth.logout();
    history.push("/login");
  }
  throw res;
}
