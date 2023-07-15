import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './styles/App.scss'
import Hero from './components/Hero'
import 'react-toastify/dist/ReactToastify.min.css'
import { toast, ToastContainer } from 'react-toastify';
import Me from './components/Me';
import Menu from './components/Menu'
import Heading from './components/Heading'
import Footer from './components/Footer'
import Contact from './components/Contact'
import Cart from './components/Cart'
import Shipping from './components/Shipping'
import ConfirmOrder from './components/ConfirmOrder'
import OrderPlaced from './components/OrderPlaced'
import Login from './components/Login'
import Profile from './components/Profile'
import Payment from './components/Payment';
import Orders from './components/Orders'
import OrdersDetails from './components/OrdersDetails'

import Dashboard from './components/Dashboard'
import Users from './components/Users'
import MyOrders from './components/MyOrders'
import NotFound from './components/NotFound'
import { useDispatch, useSelector } from 'react-redux'
import { LoadUser, setIsLogOut } from './slices/userSlice'
import ProtectedRoute from './components/ProtectedRoute'
import Items from './components/Items'
import axios from 'axios'
import StripeCompo from './components/StripeCompo'
import About from './components/About'
const server = 'https://mbabwbackend.onrender.com';
axios.defaults.withCredentials=true;
const App = () => {
  const { isAuth, isLogout, user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("")
  async function getApiKey() {
    try {
      const { data } = await axios.get(`${server}/stripe/api/key`);
      setStripeApiKey(data.stripeApiKey);
      console.log(data.stripeApiKey);
    }
    catch (err) {
      console.log(err.message);
    }
  }


  useEffect(() => {
    if (isLogout) {
      toast.success("Logout Successfully");
      dispatch(setIsLogOut(false));
    }
    dispatch(LoadUser());
    getApiKey();

  }, [isAuth]);
  return (

    <BrowserRouter>

      <Header isAuth={isAuth} ></Header>

      <Routes>

        <Route path='/' element={
          <>
            <Hero></Hero>


            <Me></Me>
            <div id="menu"> <Heading text="Menu" /></div>

            <Menu />

          </>
        }></Route>

        <Route path='/contact' element={

          <Contact />

        }></Route>

        <Route path='/cart' element={<Cart />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/items' element={<Items />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/confirm/order' element={
          <ProtectedRoute isAuth={isAuth}  ><ConfirmOrder /></ProtectedRoute>

        } />
        <Route path='/payment/success' element={

          <ProtectedRoute isAuth={isAuth}  ><OrderPlaced /></ProtectedRoute>


        } />
        <Route path='/login' element={<Login />} />
        <Route path='/me' element={<ProtectedRoute isAuth={isAuth}> <Profile />
        </ProtectedRoute>} />
        <Route path='/orders' element={

          <ProtectedRoute isAuth={isAuth}  ><MyOrders /></ProtectedRoute>


        } />
        <Route path='/order/:orderid' element={
          <ProtectedRoute isAuth={isAuth}  ><OrdersDetails /></ProtectedRoute>
        } />
        <Route path='/admin/dashboard' element={

          <ProtectedRoute isAuth={isAuth}  ><Dashboard /></ProtectedRoute>

        } />
        <Route path='/admin/users' element={
          <ProtectedRoute isAuth={isAuth}  ><Users /></ProtectedRoute>
        } />
        <Route path='/admin/orders' element={
          <ProtectedRoute isAuth={isAuth}><Orders /></ProtectedRoute>
        } />

        <Route path='/process/payment' element={
          <ProtectedRoute isAuth={isAuth} >
            <StripeCompo stripeApiKey={stripeApiKey} />

          </ProtectedRoute>

        } ></Route>
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFOund />} />
      </Routes>



      <Footer></Footer>
      <ToastContainer position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"></ToastContainer>
    </BrowserRouter>


  )
}

export default App
