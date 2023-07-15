import React from 'react'
import { IoFastFoodOutline } from "react-icons/io5";
import '../styles/Loading.scss'
const Loading = () => {

  return (
    <div className='loader'>
     <div>
        <IoFastFoodOutline/>
        <h3>Loading...</h3>
     </div>
    </div>
  )
}

export default Loading
