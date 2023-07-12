import React, {useState, useEffect} from 'react'
import APIService from './APIService'
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice'
import Header from './Header'
import './login.css'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff';



function Login() {

    const [username,  setUsername] = useState('')
    const [password,  setPassword] = useState('')
    const [passwordType, setPasswordType] = useState("password");
    const [confirmpassword, setConfirmPassword] = useState('')
    const [token, setToken] = useCookies(['mytoken'])
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState('')

    let history = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
      if(token['mytoken']?.length > 10){
        history('/articles')
      }
      else{
        history('/')
      }

    }, [token])



  const toggleShowPassword = () => {
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }


const setLogin = () => {
  setError("")
  setIsLogin(false)
  setUsername("")
  setPassword("")
  setConfirmPassword("")
}

const setRegister = () => {
  setError("")
  setIsLogin(true)
}
    

const loginBtn = () =>{
  setError("")
  if(username.trim() === "" || password.trim() === ""){
    setError("you must complete both fields!")
  }

  else if(token['mytoken']?.length <= 12){
    setError("username/password incorrect")
  }

    APIService.LoginUser({username, password})
    .then(resp => setToken('mytoken', resp.token))
    .then( resp => {
      dispatch(login({
          displayName: username,
      }));
  })
  .catch((error) => setError(error));
   }


const registerBtn = () =>{
  setError("")
  if (password.trim() !== confirmpassword.trim()) {
    setError("password didn't match!")
  }

  else if(username.trim() === "" || password.trim() === "" || confirmpassword.trim() === ""){
    setError("you must complete all fields!")
  }

  else{
    APIService.RegisterUser({username, password})
    .then(resp => setIsLogin(true))
    .catch((error) => alert(error.message));
  }
  
}

  return (
    <div>
      <Header />
      <div className='login'>
     
     {isLogin ? <h4>Login</h4> : <h4>Register</h4>}
   
    <div className='form mt-0'>
      
           <div className="mb-3 mt-0">
               <label htmlFor="username" className='form-label'>Username</label>
              <div className='inputs'>
              <input type="text" className='form-control' id='username' 
               value={username} onChange={e => setUsername(e.target.value)} autocomplete="off"/>
              </div>
           </div>

           <div className="mb-3">
               <label htmlFor="password" className='form-label'>Password</label>
               <div className='inputpassword'>
                  <div>
                    <input type={passwordType} className='form-control checkpassword' id='password' 
                      value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className="tooglebtn" onClick={toggleShowPassword}>
                        { passwordType==="password"? <VisibilityOff />: <Visibility /> }
                  </div>
                
               </div>

                
           </div>

           {!isLogin ? (<div className="mb-3">
               <label htmlFor="password" className='form-label'>Confirm Password</label>
                <div className='inputs'>
                <input type="password" className='form-control' id='password'
               value={confirmpassword} onChange={e => setConfirmPassword(e.target.value)} />
                </div>
           </div> ) : null}

           <div className='error'>{error? (<p>{error}</p>) : null}</div>

           {isLogin ? (<div className='loginBtn'>
             <button type="submit" className='btn btn-dark' onClick={loginBtn}>Login</button>
             <p>Forgot password?</p>
           </div>) :
           <button type="submit" className='btn btn-dark' onClick={registerBtn}>Register</button>}
      

       {isLogin ? <h5 className='mt-3 text-secondary'>You don't have an account yet? Kindly 
         <i className='text-dark ' onClick={() => setLogin()}> Signup</i> here</h5>
         : <h5 className='mt-3 text-secondary'>Own an account already? Please 
         <i className='text-dark' onClick={() => setRegister()}> Signin</i> here</h5>}

    </div>

   </div>
    </div>
  )
}

export default Login
