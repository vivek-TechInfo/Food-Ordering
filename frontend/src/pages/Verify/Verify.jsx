import React, { useContext,useEffect } from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {
    const navigate =  useNavigate()

    const [searchParams,setSearchParams] =  useSearchParams()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    console.log(success,orderId);

    const {url} = useContext(StoreContext)

    const verifyPayment = async(req,res)=>{
        const response =  await axios.post(url+"/api/order/verify",{success,orderId})

        if(response.data.success){
            navigate("/myorders")
            toast.success(response.data.message)

        }else{
            navigate("/")
            toast.warning(response.data.message)

        }
    }


    useEffect(()=>{
        verifyPayment()
    },[])
  return (
    <div className='verify'>
        <div className="spinner">

        </div>

    </div>
  )
}

export default Verify