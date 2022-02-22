import { api, catchHandler } from "../../../helpers/axios";
import config from "../../../../config";

export function login(data) {
  return api()
    .post(config.routes.login, data)
    .catch(catchHandler);
}
export function logout() {
  return api()
    .post(config.routes.logout)
    .catch(catchHandler);
}
