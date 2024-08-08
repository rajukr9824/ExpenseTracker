const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const connectDB = require('./config/connectDB')
const path=require('path')

dotenv.config()
connectDB()
const app=express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//user routes
app.use('/api/v1/users', require('./routes/userRoute'))

//transaction routes
app.use('/api/v1/transactions', require('./routes/transactionRoute'))


//static file
app.use(express.static(path.join(__dirname, './client/build')))
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

const PORT=4000 || process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
    
})