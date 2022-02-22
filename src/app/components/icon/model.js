import * as service from "./service";
import { NotificationManager } from "../notifications";
import { updateCookie } from "../../helpers/utility";

// {address: " kk",
//     city: "w",
//     country: "India",
//     email: "jijo@toobler.com",
//     instructions: "",
//     name: "Jijo Paulose",
//     phone: "0963345693",
//     price: "30.0000",
//     productName: "Buche Guillaud Made in France 100% Soie Duchesse Satin Black",
//     quantity: "1",
//     sku: "1137",
//     state: "w"}
export default {
  state: {
    alerts:{},
    messages:{},
    messageThread:{},
    userVendors:{},
    cart:[]
  },
  reducers: {
    onRequest(state) {
      return {
        ...state,
        loading: true
      };
    },
    onError(state, data) {
      NotificationManager.warn(data.message);
      return {
        ...state,
        loading: false
      };
    },

    onGetAlertsSuccess(state, alerts) {
      return {
        ...state,
        loading: false,
        alerts:alerts
      };
    },

    onGetMessagesSuccess(state, messages) {
      return {
        ...state,
        loading: false,
        messages: messages
      };
    },
    onUpdateAlertsSuccess(state, messages) {
      return {
        ...state,
        loading: false,
      };
    },
    onUpdateMessagesSuccess(state, messages) {
      return {
        ...state,
        loading: false,
      };
    },
    onGetMessagesThreadSuccess(state, messages) {
      return {
        ...state,
        loading: false,
        messageThread:messages
      };
    },
    onCreateMessageThreadSuccess(state, messages) {
      return {
        ...state,
        loading: false,
      };
    },
    onCreateMessageSuccess(state, messages) {
      NotificationManager.success("Message Added");
      return {
        ...state,
        loading: false,
      };
    },
    onGetCompanySuccess(state, vendors) {
      updateCookie(vendors.account)
      return {
        ...state,
        loading: false,
        userVendors:vendors
      };
    },
    onAddToCart(state, data) {
      let cart = state.cart
        cart.push(data)
      return {
        ...state,
        loading: false,
        cart
      };
    },
    onClearCart(state, data) {
      return {
        ...state,
        loading: false,
        cart:[]
      };
    },
  },
  effects: {
    async getAlerts(payload, rootState) {
      //this.onRequest();
      try {
        let res = await service.getAlerts(payload);
        this.onGetAlertsSuccess(res.data);
        return res;
      } catch (e) {
        console.log(e)
      }
    },
    async getMessages(payload, rootState) {
      //this.onRequest();
      try {
        let res = await service.getMessages(payload);
        this.onGetMessagesSuccess(res.data);
        return res;
      } catch (e) {
        console.log(e)
      }
    },
    async updateAlert(payload, rootState) {
      //this.onRequest();
      try {
        let res = await service.updateAlert(payload);
        this.onUpdateAlertsSuccess(res.data);
        return res;
      } catch (e) {
        console.log(e)
      }
    },
    async updateMessage(payload, rootState) {
      //this.onRequest();
      try {
        let res = await service.updateMessage(payload);
        this.onUpdateMessagesSuccess(res.data);
        return res;
      } catch (e) {
        console.log(e)
      }
    },
    async getMessageThread(payload, rootState) {
      //this.onRequest();
      try {
        let res = await service.getMessageThread(payload);
        this.onGetMessagesThreadSuccess(res.data);
        return res;
      } catch (e) {
        console.log(e)
      }
    },
    async createMessageThread(payload, rootState) {
      //this.onRequest();
      try {
        let res = await service.createMessageThread(payload);
        this.onCreateMessageThreadSuccess(res.data);
        return res;
      } catch (e) {
        console.log(e)
      }
    },
    async createMessage(payload, rootState) {
      //this.onRequest();
      try {
        let res = await service.createMessage(payload);
        this.onCreateMessageSuccess(res.data);
        return res;
      } catch (e) {
        console.log(e)
      }
    },
    async getCompanies(payload, rootState) {
      //this.onRequest();
      try {
        let res = await service.getCompanies(payload);
        this.onGetCompanySuccess(res.data);
        return res;
      } catch (e) {
        this.onError(e);
      }
    },
    async addToCart(payload, rootState) {
      try {

        this.onAddToCart(payload);
        return payload;
      } catch (e) {
      }
    },
    async clearCart(payload, rootState) {
      try {
        this.onClearCart(payload);
        return payload;
      } catch (e) {
      }
    },
  }
};
