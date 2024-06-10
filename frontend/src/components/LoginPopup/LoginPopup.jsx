import React,{useContext, useState} from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/assets'
import axios from "axios"
import {StoreContext} from "../../context/StoreContext"
import { toast } from 'react-toastify'

const LoginPopup = ({setShowLogin}) => {
    const  [currentState, setCurrentState] = useState("Login")
    const { url ,setToken } = useContext(StoreContext)
    

    const [data,setData] =  useState({
        name:"",
        email:"",
        password:""
    })

    console.log(data);

    const onChangeHandler = (event)=>{

        const name = event.target.name
        const value = event.target.value

        setData((prevData)=>({...prevData,[name]:value}))


    }

const onLogin = async(event)=>{
    event.preventDefault()

    let newUrl = url


    if(currentState==="Login"){
        newUrl+= "/api/user/login"
    }else{
        newUrl+= "/api/user/register"
    }

    const response =  await axios.post(`${newUrl}`,data)

    if(response.data.success){
        setToken(response.data.token)
        localStorage.setItem("token",response.data.token)
        setShowLogin(false)
        toast.success(response.data.message+" 😀")


    }else{
        toast.error(response.data.message+" 😌")
    }



}



  return (
    <div className='login-popup'>
        <form className='login-popup-container' onSubmit={onLogin}>
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />


            </div>

            <div className="login-popup-inputs">
                {currentState==="Login"?<></>:<input onChange={onChangeHandler} value={data.name} name='name' type="'text'"  placeholder='Your name' required/>}
                
                <input onChange={onChangeHandler} value={data.email} type="email" name='email'   placeholder='Your email' required/>
                <input onChange={onChangeHandler} value={data.password} type="password" name='password'  placeholder=' password' required autoComplete='of'/>

            </div>

            <button type='submit'>{currentState==="Sign Up"? "Create account":"Login"}</button>

            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing, i agree to the terms of use & privacy policy</p>
            </div>
            {currentState==="Login"?<p>Create a new acoount? <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>:<p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login here</span></p>}
            
            

        </form>
    </div>

  )
}

export default LoginPopup