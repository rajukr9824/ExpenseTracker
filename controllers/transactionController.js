const Transaction = require("../models/transactionModel")
const moment=require('moment')
const getAllTransactions=async(req,res)=>{
    try {
        const {frequency, selectedDate, type}=req.body

        const transactions=await Transaction.find({
           ...(frequency!=='custom'?{
            date:{
                $gt:moment().subtract(Number(frequency), 'd').toDate(),
            },
           }:{
               date:{
                $gte:selectedDate[0],
                $lte:selectedDate[1]
               }
           }),
           ...(type!=='all' && {type}),
            userid:req.body.userid});
        res.status(200).json(transactions)
    } catch (error) {
        console.log(error);
        res.status(500).json(error) 
    }
}
const editTransaction=async(req,res)=>{
    try {
        await Transaction.findOneAndUpdate(
            {
                _id:req.body.transactionId
            },
            req.body.payload
        );
        res.status(200).send("Edit successfully!")
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }
}
const deleteTransaction=async(req, res)=>{
    try {
        await Transaction.findOneAndDelete({_id:req.body.transactionId})
        res.status(200).send('Transaction deleted successfully!')
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }
}
const addTransaction=async(req,res)=>{
    try {
        const newTransaction=new Transaction(req.body)
        await newTransaction.save()
        res.status(201).send('Transaction created!')
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        
    }
}

module.exports={getAllTransactions, addTransaction, editTransaction, deleteTransaction}