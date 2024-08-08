const express=require('express');
const { addTransaction, getAllTransactions, editTransaction, deleteTransaction } = require('../controllers/transactionController');


const router=express.Router();
//routes
//add transaction POST Method
router.post('/add-transaction', addTransaction)
//edit transaction POST Method
router.post('/edit-transaction', editTransaction)
//delete transaction POST Method
router.post('/delete-transaction', deleteTransaction)
//get Transaction GET Method
router.post('/get-transactions', getAllTransactions)

module.exports=router