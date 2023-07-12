import React from 'react'
import './Header.css'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import WhatsappIcon from '@material-ui/icons/WhatsApp'
import TelegramIcon from '@material-ui/icons/Telegram'

function Header(props) {
  return (

    <div className="headertop">
      <header className="topbar">
          <div className="">
            <div className="row">
              {/* <!-- social icon--> */}
              <div className="col-sm-12">
                <ul className="social-network">
                  <li><a className="waves-effect waves-dark" href="#"> <FacebookIcon /> </a></li>
                  <li><a className="waves-effect waves-dark" href="#"><TwitterIcon /></a>  </li>
                  <li><a className="waves-effect waves-dark" href="#"><TelegramIcon /></a>  </li>
                  <li><a className="waves-effect waves-dark" href="#"><WhatsappIcon /></a>  </li>
                  <li><a className="waves-effect waves-dark" href="#"><InstagramIcon /></a></li>
                </ul>
              </div>

                <div className='header mb-5'>
                    <div className="col">
                      <h2>raita.com</h2>
                    </div>
                    <div className="user col">
                      { props.userid ? ( <div>
                                    <button className="btn btn-dark" onClick={props.logoutBtn}>{props.userid}</button>
                                    <span>logout</span>
                                  </div>
                      ) : 
                        (
                                  <div>
                                    <button className="btn btn-dark" onClick={props.logoutBtn}>login</button>
                                    <span>click to login</span>
                                  </div>
                        )
                      }
                    </div>
                </div>

            </div>
          </div>
      </header>

                      {/* <div classNameName="col">
          <h2>talkArea</h2>
        </div>
        <div classNameName="user col">
          { props.userid ? ( <div>
                        <button classNameName="btn btn-dark" onClick={props.logoutBtn}>{props.userid}</button>
                        <span>logout</span>
                      </div>
          ) : 
            (
                      <div>
                        <button classNameName="btn btn-dark" onClick={props.logoutBtn}>you're logged out</button>
                        <span>click to login</span>
                      </div>
            )
          }
      </div> */}

    </div>


  

  )
}

export default Header
