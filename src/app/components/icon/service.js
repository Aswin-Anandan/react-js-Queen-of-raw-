import { api, catchHandler } from "../../helpers/axios";
import config from "../../../config";

export function getAlerts(query = {offset:0,limit:20}) {
  return api()
    .get(`${config.routes.notification}/alerts?offset=${query.offset}&limit=${query.limit}`)
    .catch(catchHandler);
}
export function getMessages(query = {offset:0,limit:20}) {
  return api()
    .get(`${config.routes.notification}/messages?offset=${query.offset}&limit=${query.limit}`)
    .catch(catchHandler);
}
export function updateAlert(id) {
  return api()
    .put(`${config.routes.notification}/alert/${id}`)
    .catch(catchHandler);
}
export function updateMessage(id) {
  return api()
    .put(`${config.routes.notification}/message/${id}`)
    .catch(catchHandler);
}
export function getMessageThread(id) {
  return api()
    .get(`${config.routes.notification}/messages-threads?message_id=${id}`)
    .catch(catchHandler);
}
export function createMessageThread(data) {
  return api()
    .post(`${config.routes.notification}/messages-thread`,data)
    .catch(catchHandler);
}
export function createMessage(data) {
  return api()
    .post(`${config.routes.notification}/message`,data)
    .catch(catchHandler);
}
export function getCompanies(data) {
  return api()
    .get(`${config.routes.getUser}/companies`)
    .catch(catchHandler);
}