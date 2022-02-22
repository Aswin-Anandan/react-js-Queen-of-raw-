import * as service from "./service";
import { NotificationManager } from "../../components/notifications";
import {history} from '../../store'

export default {
    state: {

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
        onForgotPasswordSuccess(state, res) {
            NotificationManager.success("A link will be sent to your email");
            return {
                ...state,
                loading: false
            }
        },
        onResetPasswordSuccess(state, res) {
            NotificationManager.success('Your password has been reset')
            history.push('/login')
            return {
                ...state, 
                loading: false
            }
        }
    },
    effects: {
        async forgotPassword(payload, rootState) {
            this.onRequest()
            try {
                let res = await service.forgotPassword(payload)
                this.onForgotPasswordSuccess(res)
                return res
            }
            catch (e) {
                this.onError(e)
            }
        },
        async resetPassword(payload, rootState) {
            this.onRequest()
            try{
                let res = await service.resetPassword(payload)
                this.onResetPasswordSuccess(res)
                return res
            }
            catch(e){
                this.onError(e)
            }
        }
    }
}