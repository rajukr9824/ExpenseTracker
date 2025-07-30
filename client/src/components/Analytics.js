import React from 'react'
import {Progress} from 'antd'
const Analytics = ({allTransactions}) => {

//category
const categories=[
            'Salary',
            'Medical',
            'Food',        
            'Market',
            'Transportption',
            'Recharge',
            'Invest',
            'Others'
]

//total transaction
    const totalTransactions=allTransactions.length
    const totalIncomeTransactions=allTransactions.filter(transaction=>transaction.type==='Income')
    const totalExpenseTransactions=allTransactions.filter(transaction=>transaction.type==='Expense')
    const totalIncomePercent=(totalIncomeTransactions.length/totalTransactions)*100
    const totalExpensePercent=(totalExpenseTransactions.length/totalTransactions)*100


    //total turnover
const totalTurnOver=allTransactions.reduce(
    (acc, transaction)=>acc + transaction.amount,
    0
);
const totalIncomeTurnOver=allTransactions.filter((transaction)=>transaction.type==='Income').reduce((acc, transaction)=>acc+transaction.amount, 0)
const totalExpenseTurnOver=allTransactions.filter((transaction)=>transaction.type==='Expense').reduce((acc, transaction)=>acc+transaction.amount, 0)
const totalIncomeTurnOverPercent=(totalIncomeTurnOver/totalTurnOver)*100
const totalExpenseTurnOverPercent=(totalExpenseTurnOver/totalTurnOver)*100
  return (
    <>
    <div className="row mt-3">
        <div className="col-md-5">
            <div className="card">
                <div className="card-header">
                    Total Transactions : {totalTransactions}
                </div>
                <div className="card-body">
                    <h5 className='text-success'>Income : {totalIncomeTransactions.length}</h5>
                    <h5 className='text-danger'>Expense : {totalExpenseTransactions.length}</h5>
                    <div>
                        <Progress type='circle' strokeColor={'green'} className='mx-2' percent={totalIncomePercent.toFixed(0)}/>
                        <Progress type='circle' strokeColor={'red'} className='mx-2' percent={totalExpensePercent.toFixed(0)}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-5">
            <div className="card">
                <div className="card-header">
                    Total TurnOver : {totalTurnOver}
                </div>
                <div className="card-body">
                    <h5 className='text-success'>Income : {totalIncomeTurnOver}</h5>
                    <h5 className='text-danger'>Expense : {totalExpenseTurnOver}</h5>
                    <div>
                        <Progress type='circle' strokeColor={'green'} className='mx-2' percent={totalIncomeTurnOverPercent.toFixed(0)}/>
                        <Progress type='circle' strokeColor={'red'} className='mx-2' percent={totalExpenseTurnOverPercent.toFixed(0)}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="row mt-3" >
    
        <div className="col-md-5" >
        <h4>Categorywise Income</h4>
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            {
                categories.map(category=>{
                    const amount=allTransactions.filter(transaction=>transaction.type==='Income' && transaction.category===category).reduce((acc, transaction)=>acc+transaction.amount,0);
                    return (
                        amount>0 && (
                        <div className="card">
                            <div className="card-body">
                                <h5>{category}</h5>
                                <Progress percent={((amount/totalIncomeTurnOver)*100).toFixed(0)}/>
                              
                            </div>
                        </div>
                        )
                    )
                })
            }
            </div>
        </div>
        <div className="col-md-5" >
            <h4>Categorywise Expense</h4>
            <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            {
                categories.map(category=>{
                    const amount=allTransactions.filter(transaction=>transaction.type==='Expense' && transaction.category===category).reduce((acc, transaction)=>acc+transaction.amount,0);
                    return (
                        amount>0 && (
                        <div className="card">
                            <div className="card-body">
                                <h5>{category}</h5>
                                <Progress percent={((amount/totalExpenseTurnOver)*100).toFixed(0)}/>

                              
                            </div>
                        </div>
                        )
                    )
                })
            }
            </div>
        </div>
    </div>
    </>
      
    
  )
}

export default Analytics
