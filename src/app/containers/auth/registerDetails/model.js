import auth from "..";
import { history } from "../../../store";
import { NotificationManager } from "../../../components/notifications";

export default {
  state: {
    user: auth.loggedUser(),
  },
  reducers: {
    onRequest(state) {
      return {
        ...state,
        loading: true
      };
    },
    onError(state, { data = {} }) {
      NotificationManager.warn(data.message);
      return {
        ...state,
        loading: false
      };
    },
    onLoginSuccess(state,data) {
     // history.push("/dashboard");
      return {
        ...state,
        loading: false,
        user: data.user
      };
    },
    onLogoutSuccess(state) {
      history.push("/login");
      return {
        ...state,
        user: null
      };
    },
  },
  effects: {
    async login(payload, rootState) {
      this.onRequest();
      try {
        let res = await auth.login(payload);
        this.onLoginSuccess(res);
        return res;
      } catch (e) {
        this.onError(e);
      }
    },
    async logout() {
      auth.logout();
      this.onLogoutSuccess();
    },
  }
};
