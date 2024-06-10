import React, { useContext, useState,useEffect } from 'react'
import "./PlaceOrder.css"
import {useNavigate} from "react-router-dom"
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url}    = useContext(StoreContext)



  const [data , setData] =  useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })


  const OnChangeHandler = (event)=>{
    const name =  event.target.name
    const value =  event.target.value


    setData((prevData)=>({...prevData,[name]:value}))
  }

  const onSubmitHandler = async (event)=>{

    event.preventDefault()

    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let iteminfo = item;
        iteminfo["quantity"] = cartItems[item._id];
        orderItems.push(iteminfo)
      }
    })


    // console.log(orderItems)

    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+25
    }


    let response = await axios.post(url+"/api/order/place",orderData ,{headers:{token}})

    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url)
    }else{
      alert("Error")
    }



  }

  const navigate =  useNavigate()

  useEffect(() => {


    if(!token){
      navigate("/cart")

    }else if(getTotalCartAmount()===0){
      navigate("/cart")
    }

    
 
  }, [token])
  
  return (
    <div >

      <form className='place-order' onSubmit={onSubmitHandler}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="mutl-fields">
          <input required onChange={OnChangeHandler} name='firstName'  value={data.firstName} type="text" placeholder='First name' />
          <input required onChange={OnChangeHandler} name='lastName'  value={data.lastName} type="text" placeholder='Last name' />
        </div>

        <input required onChange={OnChangeHandler} name='email'  value={data.email} type="email" placeholder='Email address' />
        <input required onChange={OnChangeHandler} name='street'  value={data.street} type="text" placeholder='Street' />

        <div className="mutl-fields">
          <input required onChange={OnChangeHandler} name='city'  value={data.city} type="text" placeholder='City' />
          <input required onChange={OnChangeHandler} name='state'  value={data.city} type="text" placeholder='State' />
        </div>

        <div className="mutl-fields">
          <input required onChange={OnChangeHandler} name='zipcode'  value={data.zipcode} type="text" placeholder='zip code' />
          <input required onChange={OnChangeHandler} name='country'  value={data.country} type="text" placeholder='Country' />
        </div>

        <input required onChange={OnChangeHandler} name='phone'  value={data.phone} type="number"  placeholder='Phone'/>

      </div>

      <div className="place-order-right"> 


      <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>SubTotal</p>
                <p>{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>{getTotalCartAmount()===0 ? 0 :25}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>{getTotalCartAmount()=== 0 ? 0: getTotalCartAmount()+25}</b>
              </div>
              
            </div>
              <button type='submit' >PROCEED TO PAYMENT</button>
          </div>


        
        </div>
      </form>

      
    </div>
  )
}

export default PlaceOrder
