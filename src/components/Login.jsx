import React, { useEffect } from 'react'
import '../styles/Login.scss';
import {FcGoogle} from 'react-icons/fc';
import {motion} from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser } from '../slices/userSlice';

import { useNavigate } from 'react-router-dom';
const Login = () => {
  const dispatch = useDispatch();
  const {isAuth} = useSelector((state) => state.userReducer);

  const login = ()=>{
    console.log("called")
    dispatch(LoginUser());
  } 
 const navigation = useNavigate();
 
  
 useEffect(()=>{
  if(isAuth){
    navigation('/') 
  }
 },[isAuth])

  return (
    <div className='login-cont'>
      <motion.div  
      initial={{y:"-200%",opacity:0}}
      whileInView={{y:0 , opacity:1}}
      >
        <h4 onClick={login} >Login with Google </h4> {<FcGoogle/>} 
      </motion.div>
    </div>
  )
}

export default Login
