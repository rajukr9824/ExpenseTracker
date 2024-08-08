const mongoose=require('mongoose')

const transactionSchema=new mongoose.Schema({
   userid:{
     type:String,
     required:true
   },
    amount:{
        type:Number,
        required:[true, 'amount is required!']
    },
    type:{
      type:String,
      required:[true, 'type is required!']
  },
     category:{
        type:String,
        requires:[true, 'category is required!']
     },
      reference:{
        type:String,
        required:[true, 'reference is required!']
     },
     description:{
        type:String,
     },
     date:{
        type:Date,
        required:[true, 'date is required!']
     }
}, {timestamps:true})

const Transaction=mongoose.model('Transaction', transactionSchema)
module.exports=Transaction