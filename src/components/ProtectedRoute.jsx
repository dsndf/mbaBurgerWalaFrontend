import React, { Children, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

const ProtectedRoute = ({children,isAuth}) => {

const navigate = useNavigate();
const path = window.location.pathname;
 console.log("path is",path)
   useEffect(()=>{
  
  
    // if(!isAuth){
    //     navigate('/login');
    // }
  
   },[isAuth]) 
  return (
children
  )
}

export default ProtectedRoute
