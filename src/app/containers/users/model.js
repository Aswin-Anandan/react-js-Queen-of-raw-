import * as service from "./service";
import { NotificationManager } from "../../components/notifications";

export default {
  state: {
    users:[],
    user:{},
    vendors:[],
    products:[],
    vendorCompany:[],
    unReadFavourites: 0
  },
  reducers: {
    onRequest(state) {
      return {
        ...state,
        loading: true
      };
    },
    onError(state, { data = {} }) {
      let message = data.message ? data.message : data.error ? data.error  : "Unable to process"
      NotificationManager.warn(message);
      return {
        ...state,
        loading: false
      };
    },
    onSuccess(state, { data = {} }) {
      return {
        ...state,
        loading: false
      };
    },
    onGetUsersSuccess(state, users) {
      return {
        ...state,
        loading: false,
        users: users.data
      };
    },
    onGetUserSuccess(state, user) {
      return {
        ...state,
        loading: false,
        user: user.data
      };
    },
    onGetRolesSuccess(state, roles) {
      return {
        ...state,
        loading: false,
        roles: roles.data
      };
    },
    onGetVendorsSuccess(state, vendors) {
      return {
        ...state,
        loading: false,
        vendors: vendors.data
      };
    },
    onGetProductsSuccess(state, products) {
      return {
        ...state,
        loading: false,
        products: products.data
      };
    },
    onCreateUserSuccess(state, roles) {
      NotificationManager.success("User Created");
      return {
        ...state,
        loading: false,
      };
    },
    onAddFavouritesSuccess(state, roles) {
      NotificationManager.success("Added to favourites");
      return {
        ...state,
        loading: false,
      };
    },
    onGetFavouriteCountSuccess(state, data) {
      return {
        ...state,
        loading: false,
        unReadFavourites: data
      };
    },
    onUpdateUserSuccess(state, roles) {
      NotificationManager.success("User Information Updated");
      return {
        ...state,
        loading: false,
      };
    },
    onUpdatePermissionsSuccess(state, roles) {
      NotificationManager.success("Vendor Chain Permissions Updated");
      return {
        ...state,
        loading: false,
      };
    },
    onVendorCompaniesSuccess(state, vendors) {
      return {
        ...state,
        loading: false,
        vendorCompany:vendors
      };
    },
    onDeleteVendorPermissionsSuccess(state, vendors) {
      NotificationManager.success("Vendor Chain Permissions Deleted");
      return {
        ...state,
        loading: false,
      };
    },
  },
  effects: {
    async getUsers(payload, rootState) {
      this.onRequest();
      try {
        let res = await service.getUsers();
        this.onGetUsersSuccess(res);
        return res;
      } catch (e) {
        this.onError(e);
      }
    },
    async getUser(payload, rootState) {
      if(payload.loader)
         this.onRequest();
      try {
        let res = await service.getUser(payload);
        this.onGetUserSuccess(res);
        return res;
      } catch (e) {
        this.onError(e);
      }
    },
    async getVendors(payload, rootState) {
      this.onRequest();
      try {
        let res = await service.getVendors(payload);
        this.onGetVendorsSuccess(res);
        return res;
      } catch (e) {
        this.onError(e);
      }
    },
    async getProducts(payload, rootState) {
      this.onRequest();
      try {
        let res = await service.getProducts(payload);
        this.onGetProductsSuccess(res);
        return res;
      } catch (e) {
        this.onError(e);
      }
    },
    async getRoles(payload, rootState) {
     // this.onRequest();
      try {
        let res = await service.getRoles();
        this.onGetRolesSuccess(res);
        return res;
      } catch (e) {
        this.onError(e);
      }
    },
    async createUser(payload, rootState) {
      this.onRequest();
      try {
        let res = await service.createUser(payload);
        this.onCreateUserSuccess(res);
        return res;
      } catch (e) {
        this.onError(e);
      }
    },
    async updateUser(payload, rootState) {
      this.onRequest();
      try {
        let res = await service.updateUser(payload);
        this.onUpdateUserSuccess(res);
        return res;
      } catch (e) {
        this.onError(e);
      }
    },
    async updatePermissions(payload, rootState) {
      this.onRequest();
      try {
        let res = await service.updatePermissions(payload);
        this.onUpdatePermissionsSuccess(res);
        return res;
      } catch (e) {
        this.onError(e);
      }
    },
    async vendorCompanies(payload, rootState) {
      //this.onRequest();
      try {
        let res = await service.vendorCompanies(payload);
        this.onVendorCompaniesSuccess(res.data);
        return res;
      } catch (e) {
        this.onError(e);
      }
    },
    async deleteVendorPermissions(payload, rootState) {
      //this.onRequest();
      try {
        let res = await service.deleteVendorPermissions(payload);
        this.onDeleteVendorPermissionsSuccess(res.data);
        return res;
      } catch (e) {
        this.onError(e);
      }
    },
    async addFavourites(payload, rootState) {
      //this.onRequest();
      try {
        let res = await service.addFavourites(payload);
        this.onAddFavouritesSuccess(res.data);
        return res;
      } catch (e) {
        this.onError(e);
      }
    },
    async getFavouritesCount(payload, rootState) {
      //this.onRequest();
      try {
        let res = await service.getFavouritesCount(payload);
        this.onGetFavouriteCountSuccess(res.data);
        return res;
      } catch (e) {
        this.onError(e);
      }
    },
  }
};
