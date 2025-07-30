import React, {useEffect, useState} from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'
const Register = () => {

const navigate=useNavigate()
const [loading, setLoading]=useState(false)
    const submitHandler=async(values)=>{
        try {
           setLoading(true)
          await axios.post('/api/v1/users/register', values)
          message.success('Registered successfully!')
          setLoading(false)
          navigate('/login')
        } catch (error) {
          setLoading(false)
          message.error("Something went wrong!")
        }
        
    }
    //prevent for login user
    useEffect(()=>{
      if(localStorage.getItem("user")){
        navigate('/')
      }
    }, [navigate])
  return (
    <>
     <div className='register-page'>
      {loading && <Spinner/>}
       <Form layout='vertical' className='formR' onFinish={submitHandler}>
        <h3 className='text-center'>Register Form</h3>
        <Form.Item label="Name" name="name"><Input/></Form.Item>
        <Form.Item label="Email" name="email"><Input type='email'/></Form.Item>
        <Form.Item label="Password" name="password"><Input type='password'/></Form.Item>
        <div className="d-flex justify-content-center">
            <Link className='login-link'to='/login'>Already Registered ? Login here</Link>
            <button className='btn btn-dark'>Register</button>
        </div>
       </Form>
     </div>
    </>
      

  )
}

export default Register
