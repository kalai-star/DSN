import React, { useState } from 'react'
import './Menu.css'
import { useNavigate } from 'react-router-dom';
export default function Menu() {
   const navigate=useNavigate()
    const[done,setdone]=useState();
    const[recv,setrecv]=useState()
    const handleDonate=(e)=>{

         setdone(e.target.value)
        navigate('/donate')}
        const handleReceiver=(e)=>{

          setrecv(e.target.value)
         navigate('/receiver')}
    
    
  return (
    <div className='menu'>
        <button className='button' value={done} onClick={handleDonate}>Donate</button>
        <button className='button' value={recv} onClick={handleReceiver}>Receive </button>
    </div>
  )
}