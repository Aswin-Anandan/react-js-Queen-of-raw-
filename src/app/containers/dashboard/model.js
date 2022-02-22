// import * as service from "./service";
import { NotificationManager } from "../../components/notifications";

export default {
  state: {
    statistics: {},
    mapDetails: {},
    vendorCompanies: [],
    companyids: []
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
  },
  effects: {}
};
