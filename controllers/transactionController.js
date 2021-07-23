const Transaction = require('../model/Transaction')
const {serverError} = require('../util/error')
const User = require('../model/User')
module.exports = {

    create(req, res){
       let {amount,note,type}= req.body 
       let userId = req.user._id
       
       let transaction = new Transaction({
           amount,note,type,author:userId
       })

       transaction.save()
            .then(trans=>{
                let updatedUser = {...req.user._doc}
                if(type === 'income'){
                    updatedUser.balance = parseInt(updatedUser.balance) + parseInt(amount)
                    updatedUser.income = parseInt(updatedUser.income) + parseInt(amount)
                }else if(type === 'expense'){
                    updatedUser.balance = parseInt(updatedUser.balance) - parseInt(amount)
                    updatedUser.expense = parseInt(updatedUser.expense) + parseInt(amount)
                }
                
                updatedUser.transactions.unshift(trans._id)
                User.findByIdAndUpdate(updatedUser._id, {$set: updatedUser},{new:true})
                    .then(user=>{
                        res.status(201).json({
                            message: 'Transaction created successfully',
                            ...trans._doc,
                            user:user
                        })
                    })
                    .catch(error=>serverError(res, error))
                
                console.log(updatedUser)
            })
            .catch(error=>serverError(res, error))
    },
    getAll(req, res) {
        let {_id} = req.user
        Transaction.find({author:_id})
            .then(transactions=>{
                if(transactions.length === 0){
                    res.status(200).json({
                        message:'No transactions found'
                    })
                }else{
                    res.status(200).json(transactions)
                }
            })
            .catch(error=>serverError(res, error))
    },
    getSingleTransaction(req, res) {
        let {transactionId}= req.body
        Transaction.findById(transactionId)
            .then(transaction =>{
                if(!transaction){
                    res.status(200).json({
                        message:'No transaction found'
                    })
                }else{
                    res.status(200).json(transaction)
                }
            })
            .catch(error=>serverError(res, error))
    },
    update(req, res) {
        
        let {transactionId} = req.params
        Transaction.findByIdAndUpdate(transactionId,{$set:req.body},{new:true})
               .then(result=>{
                    res.status(200).json({message:'Updated successfully', ...result._doc})
               })
               .catch(error=>serverError(res, error))
    },
    remove(req, res){
        let {transactionId} = req.params
        Transaction.findOneAndDelete({_id:transactionId})
               .then(result=>{
                    res.status(200).json({message:'Deleted successfully', ...result._doc})
               })
               .catch(error=>serverError(res, error))
    }

}