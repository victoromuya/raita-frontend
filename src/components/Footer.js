import React from 'react'
import './Footer.css'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import WhatsappIcon from '@material-ui/icons/WhatsApp'
import TelegramIcon from '@material-ui/icons/Telegram'


function Footer() {
  return (
    <div className='footer'>

    <div className='row'>
        <div className="desc col-lg-4 col-md-4 col-sm-12">
          <h2>Write with Raita</h2>
          <div>
            <p>Practise your own writing skills here. We will create an awareness for your contents
              and connect you with professionals
            </p>
          </div>
        </div>
        <div className="social col-lg-4 col-md-4 col-sm-12">
          <h2>Social Handles</h2>
            <div><InstagramIcon/> <span>Instagram</span></div>
            <div><TwitterIcon /> <span>Twitter</span></div>
            <div><TelegramIcon /> <span>Telegram</span></div>
            <div><WhatsappIcon /> <span>Whatsapp</span></div>
            <div><FacebookIcon/> <span>Facebook</span></div>
        </div>

        <div className="contact col-lg-4 col-md-4 col-sm-12">
            <h2>Contact Us</h2>
            <div><PhoneIcon /> <span>08088992200</span></div>
            <div><EmailIcon /> <span>raita@info.com</span></div>
            <div><LocationOnIcon /> <span>Lagos, Nigeria</span></div>

        </div>
    </div>

    <div className='pt-5 text-white text-left'>
      <p>Copywrite @2023 all right reserved - by premierlead</p>
    </div>
    
  </div>
  )
}

export default Footer