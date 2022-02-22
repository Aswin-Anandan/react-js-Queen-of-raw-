import { login } from "./login/service";
import { clearCookies,setCookies,getJsonCookies,getCookie} from "../../helpers/utility";

class Authentication {
  async login(data) {
    let res = await login(data);
    setCookies(res.data);
    return res;
  }
  logout() {
    clearCookies();
  }
  token() {
    return getJsonCookies();
  }
  loggedUser() {
    if (getCookie())
      return getCookie();
  }
  isAuthenticated() {
    return this.token() ? true : false;
  }
 
}

export default new Authentication();
