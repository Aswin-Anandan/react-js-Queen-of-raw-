import Cookies from "js-cookie";
import config from "../../config";
const cookies = config.cookies;

export function clearCookies() {
  Cookies.remove(cookies.name);
}

export function setCookies(data) {
  try {
    let cookie = {};
    console.log(data.user)
    if (data.token) cookie.token = data.token;
    if (data.user && data.user.id) cookie.id = data.user.id;
    if (data.user && data.user.email) cookie.email = data.user.email;
    if (data.user && data.user.mmx_role) cookie.mmx_role = data.user.mmx_role;
    if (data.user && data.user.account_names) cookie.company = data.user.account_names.name;
    if (data.user && data.user.account_names) cookie.company_image = data.user.account_names.company_image;
    if (data.user && data.user.username) cookie.username = data.user.username;
    if (data.user && data.user.profile_photo) cookie.profile_photo = data.user.profile_photo;

    Cookies.set(cookies.name, cookie, { expires: cookies.expiry});
  } catch (e) {
    console.log("set cookie err", e);
  }
}
export function updateCookie(data) {
  let token = Cookies.getJSON(cookies.name);
  if (data.name) token.company = data.name;
  if (data.company_image) token.company_image = data.company_image;

  Cookies.set(cookies.name, token,{ expires: cookies.expiry});
}

export function getCookies() {
  return Cookies.getJSON(cookies.name);
}

export function getJsonCookies() {
  let cookie = Cookies.getJSON(cookies.name);
  if (cookie) return cookie.token;
}

export function getCookie() {
  let token = Cookies.getJSON(cookies.name);
  if (token) return token;
}
