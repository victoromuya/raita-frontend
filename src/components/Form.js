import React, {useState, useEffect} from 'react'
import APIService from './APIService'
import { useCookies } from "react-cookie";
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import './Form.css'

function Form(props) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [token, setToken] = useCookies(['mytoken'])
  
  const user = useSelector(selectUser)
  const userid = user?.displayName

  const insertArticle = () =>{

    const date = new Date()
    
    if (title.trim() === "" || description.trim() === "") {
      alert("kindly add content in all fields before submiting")
    }
    else{
    APIService.InsertArticle({title, description, userid, date}, token['mytoken'])
    .then(resp => props.InsertedInformation(resp))
    }
    
  }

  return (
    <div className='articleForm'>
        <div className='mb-3'>
         <label htmlFor='title' className='form-label'>Title</label>
         <input type="text" className="form-control mb-3" id="title"
         value={title} onChange={e => setTitle(e.target.value)}></input>

         <label htmlFor='description' className='form-label'>Content</label>
         <textarea className='form-control' id="description" rows="20" 
         value={description} onChange={e => setDescription(e.target.value)}></textarea>

          <br/>
          
         <button className='btn btn-dark' onClick={insertArticle}>SEND</button>
        </div>
    </div>
  )
}

export default Form
