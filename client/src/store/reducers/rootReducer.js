import { combineReducers } from "redux"
import authReducer from "./authReducer"
import transactionsReducer from "./transactionsReducer"



const rootReducre = combineReducers({
    auth:authReducer,
    transactions:transactionsReducer
})

export default rootReducre