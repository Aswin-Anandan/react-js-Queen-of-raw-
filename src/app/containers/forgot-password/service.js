import { api, catchHandler } from "../../helpers/axios";
import config from "../../../config";

export function forgotPassword(payload){
    return api()
        .post(config.routes.forgotPassword, payload)
        .catch(catchHandler)
}

export function resetPassword(payload){
    return api()
        .post(config.routes.resetPassword, payload)
        .catch(catchHandler)
}