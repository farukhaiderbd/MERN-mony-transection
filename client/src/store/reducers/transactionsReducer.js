import * as Types from '../actions/types'


const transactionsReducer = (state=[],action)=>{

    switch (action.type){
        case Types.LOAD_TRANSACTIONS: {
            return action.payload.transactions
        }
        case Types.CREATE_TRANSACTION: {
            let transactions = [...state]
            transactions.unshift(action.payload.transaction)
            return transactions
        }
        default: return state
    }


}

export default transactionsReducer