import React, { useState } from 'react'
import axios from'axios'
import './Signup.css'
import { useNavigate } from 'react-router-dom'
export default function Signup() {
    const navigate=useNavigate()
    const[message,setMessage]=useState('')
    const[formData,setFormData]=useState({
        username:'',
        email:'',
        password:''
})
const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
}
const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(formData)
    axios.post('http://localhost:3005/users/signup',formData)
    .then((res)=>{
        setMessage('Signup Successfully Redirecting to Login...')
        setTimeout(()=>{
            navigate('/login')
        },3000)
    })
}
  return (
    <div className='a'><br></br>
    <form onSubmit={handleSubmit} className='b'>
        <h1 className='c'>Signup</h1>
        <label className='d'  htmlFor='name1'>Username</label><br></br>
        <input className='e'  type='text' id='name1' placeholder='Username' name='username' value={formData.username} onChange={handleChange}/><br></br>
        <label className='f' htmlFor='mail'>Email</label><br></br>
        <input className='g' type='text' id='mail' placeholder='E-mail ID' name='email' value={formData.email} onChange={handleChange}/><br></br>
        <label className='h' htmlFor='pass'>Password</label><br></br>
        <input className='i' type='password' id='pass' placeholder='Enter your password' name='password' value={formData.password} onChange={handleChange}/><br></br>
        <button className='j' type='submit'>Signup</button>
        <img src='https://img.freepik.com/premium-photo/247-service-icon-support-clicks-screen_438099-7527.jpg?semt=ais_hybrid' className='k'/>
        </form>
        {message}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
    </div>
  )
}
