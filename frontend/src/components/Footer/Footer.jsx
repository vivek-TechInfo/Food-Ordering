import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.khanaKhajana} alt="" width={"200px"} height={"50px"} />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus similique architecto enim?</p>

                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>

            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About-us</li>
                    <li>Delevery</li>
                    <li>Privacy policy</li>
                </ul>

            </div>

            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+917785565968</li>
                    <li>conatctkhanaKhajana777@gmail.com</li>
                </ul>

            </div>
        </div>
        <hr />

        <p className="footer-copyright">Copyright 2024 &copy; khanaKhajana.com - All Right Reserved.
        </p>
    </div>
  )
}

export default Footer