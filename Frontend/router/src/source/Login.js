import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './Auth'
import './Login.css'
export default function Login() {
  const navigate=useNavigate()
    const[username,setusername]=useState('')
    const[password,setpassword]=useState('')
    const[message,setmessage]=useState('')
    const[formData,setFormData]=useState({
      'username':'',
      'password':''
    })
    const auth=useAuth()
    const handleLogin=(e)=>{
      setFormData({ username, password });
        auth.Login(username,password)
        e.preventDefault()
        console.log(formData)
        axios.post('http://localhost:3000/users',formData)
        .then(res=>{
            setmessage('Login Successfull Redirecting to Home Page......')
            setTimeout(()=>{
                navigate('/Menu')},3000)
                console.log(res)
            })
            .catch(err=>{
                setmessage('Something went wrong')
                console.log(err)
            })
            navigate('/Menu')
    }
  return (
   
    <div className='second' >
    
      <form className='form1'>
    
      <img className='mathi' src='https://cdn.wallpapersafari.com/89/94/KycE8k.png' />
        <label className='log1' htmlFor='user'>Username:</label><br/><br/>
        <input className='siva' type='text' id='user' value={username} onChange={(e)=>setusername(e.target.value)}/><br/><br/>
        <label className='log1' htmlFor='pass'>Password:</label><br/><br/>
        <input className='siva' type='password'id='pass' value={password} onChange={(e)=>setpassword(e.target.value)}/><br/>
        <button  className='btn2' onClick={handleLogin}>Login</button>
        </form>
    </div>
    
  )
}