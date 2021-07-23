import * as Types from '../actions/types'
import Axios from 'axios'


export const loadTransactions =()=>dispatch =>{
    Axios.get('/api/transactions')
        .then(response =>{
            dispatch({
                type: Types.LOAD_TRANSACTIONS,
                payload: {
                    transactions:response.data}
            })
        })
            .catch(error=>{
                console.log(error)
            })
}

export const addNewTransaction =(transaction)=>dispatch =>{
    Axios.post('/api/transactions/',transaction)
        .then(response=>{
            console.log(response)
            dispatch({
                type: Types.CREATE_TRANSACTION,
                payload: {
                    transaction: response.data
                }
            })
        })
        .catch(error=> console.log(error))
}
export const updateTransaction =(id,transaction)=> dispatch => {
    console.log(transaction)
    Axios.put(`/api/transactions/${id}`,transaction)
            .then(response=>{
                dispatch({type: Types.UPDATE_TRANSACTION, payload:{transaction: response.data.transaction}})
            })
            .catch(error=> console.log(error))
}