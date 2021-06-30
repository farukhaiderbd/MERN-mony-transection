import { combineReducers } from "redux"
import authReducer from "./authReducer"



const rootReducre = combineReducers({
    auth:authReducer
})

export default rootReducre