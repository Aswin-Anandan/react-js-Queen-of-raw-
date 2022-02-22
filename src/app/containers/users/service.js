import { api, catchHandler } from "../../helpers/axios";
import config from "../../../config";

export function getUsers() {
  return api()
    .get(config.routes.users)
    .catch(catchHandler);
}
export function getUser(data) {
  return api()
    .get(`${config.routes.getUser}/${data.id}`)
    .catch(catchHandler);
}
export function getRoles() {
  return api()
    .get(config.routes.roles)
    .catch(catchHandler);
}
export function getVendors() {
  return api()
    .get(config.routes.getVendors)
    .catch(catchHandler);
}
export function getProducts(id) {
  return api()
    .get(`${config.routes.getProducts}/${id}`)
    .catch(catchHandler);
}
export function createUser(data){
    return api(data)
     .post(config.routes.createUser,data)
     .catch(catchHandler);
}
export function updateUser(data) {
  return api(data)
    .post(config.routes.updateUser, data)
    .catch(catchHandler);
}
export function updatePermissions(data) {
  return api(data)
    .post(`${config.routes.getUser}/vendor-permissions`, data)
    .catch(catchHandler);
}
export function vendorCompanies() {
  return api()
    .get(`${config.routes.getUser}/admin-companies`)
    .catch(catchHandler);
}
export function deleteVendorPermissions(data) {
  return api()
    .put(`${config.routes.getUser}/vendor-permissions`,data)
    .catch(catchHandler);
}
export function addFavourites(data){
  return api()
   .post(config.routes.favourites,data)
   .catch(catchHandler);
}
export function getFavouritesCount(payload) {
  return api()
    .get(`${config.routes.favouriteCount}?user_id=${payload.id}`)
    .catch(catchHandler);
}