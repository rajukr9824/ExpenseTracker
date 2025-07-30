import React, {useState, useEffect} from 'react'
import { Form, Input, message } from 'antd'
import { Link , useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'
import axios from 'axios'
const Login = () => {
  const [loading, setLoading]=useState(false)
  const navigate=useNavigate()
    const submitHandler=async(values)=>{
        try {
          setLoading(true)
        const {data} = await axios.post('/api/v1/users/login', values)
        setLoading(false)
        message.success('Logged in successfully')
        localStorage.setItem('user', JSON.stringify({...data.user, password:''}))
        navigate('/')
        } catch (error) {
          setLoading(false)
          message.error('Invalid email or password!')
        }
        
    }
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
        <h3 className='text-center'>Login Form</h3>
        <Form.Item label="Email" name="email"><Input type='email'/></Form.Item>
        <Form.Item label="Password" name="password"><Input type='password'/></Form.Item>
        <div className="d-flex justify-content-center">
            <Link className='login-link' to='/register'>Not Registered ? Register here</Link>
            <button className='btn btn-dark'>Login</button>
        </div>
       </Form>
     </div>
    </>
      

  )
}

export default Login
