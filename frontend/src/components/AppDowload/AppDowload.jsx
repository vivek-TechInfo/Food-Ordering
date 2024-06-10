import React from 'react'
import { assets } from '../../assets/assets'
import "./AppDowload.css"

const AppDowload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience Download <br /> Khana Khajana App</p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>

    </div>
  )
}

export default AppDowload