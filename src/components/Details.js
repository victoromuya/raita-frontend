import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectUser } from '../features/userSlice';
import { selectOpenArticle } from '../features/articleSlice';
import './Details.css'
import APIService from './APIService'
import { useCookies } from "react-cookie";
import Header from './Header';
import { logout } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import Comments from './Comments'
import CommentForm from './CommentForm';
import ChatIcon from '@material-ui/icons/Comment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LikeIcon from '@material-ui/icons/ThumbUpAltOutlined';
import BackIcon from '@material-ui/icons/ArrowBack';
import { createAsyncThunk, isAsyncThunkAction } from '@reduxjs/toolkit';


function Details() {

  const history = useNavigate();
  const dispatch = useDispatch();

  const selectedArticle = useSelector(selectOpenArticle)
  const user = useSelector(selectUser)
  const userid = user?.displayName

  const [editArticle, setEditArticle] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [token, setToken, removeToken] = useCookies(['mytoken'])
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState('')
  const [liked, setLiked] = useState(false)


useEffect(() => {

  setTitle(selectedArticle?.title)
  setDescription(selectedArticle?.description)
  setLikes(selectedArticle?.likes)

  fetch('https://api-raita.onrender.com/api/comments/', {
    'method':'GET', headers:{
      'Content-type':'application/json',
      'Authorization': `Token ${token['mytoken']}`
    }
  })
  .then(resp => resp.json())
  .then(resp =>setComments(resp))
  .catch(error => console.log(error))

}, [selectedArticle,token])


  const editbtn = () =>{
    setEditArticle(selectedArticle)
  }


const goBack = () => {
  history('/articles')
}

const updateArticle = () =>{
  APIService.UpdateArticle(selectedArticle.id, {title, description}, token['mytoken'])
  .then(resp => console.log(resp))
  .then(history('/articles'))
}

const deleteArticle = () =>{
  APIService.DeleteArticle(selectedArticle.id, token['mytoken'])
  .then(history('/articles'))
  
}


//use async function
 function likeArticle() {
  if(liked === false){
    APIService.UpdateArticle(selectedArticle.id, {title, description, likes}, token['mytoken'])
    .then(resp => console.log(resp))
    .then(resp => setLiked(true))
    console.log(liked)
    
  }

}
 
const InsertedComment = (comment) =>{
  const new_comment = [...comments, comment]
  setComments(new_comment)
  
  }

const logoutBtn = () => {
  removeToken(['mytoken'])
  dispatch(logout());
  history('/')
}


  return (
    <div className='details'>

      <Header userid={userid} logoutBtn= {logoutBtn}/>
      <BackIcon className='back' onClick={() => goBack()} />

      <div className='inner__details row'>
        <div className='article__comp col-lg-6 col-md-6 col-sm-12 mb-3'>
            <div key={selectedArticle?.id} className="article__text">
              <div className='article__inner'>
                <h3>{selectedArticle?.title}</h3>
                {userid === selectedArticle?.userid ? (
                <div>
                  <span><EditIcon onClick={editbtn} /></span> 
                  <span className="text-danger"> <DeleteIcon onClick={deleteArticle} /> </span>
                </div>
              ) : null}
              </div>
              
              <p>{selectedArticle?.description}</p>
            </div>
              
              <div className='likes'>
                    <ChatIcon className='chaticon icons'/>
                    <LikeIcon className='icons' onClick={likeArticle} />
                    <span>{likes} {likes > 1 ? 'likes' : 'like'}</span>

              </div>
          
            {/* <CommentForm userid={userid} selectedArticle={selectedArticle}/> 
            <Comments comments={comments}/>   */}

        </div>
    
        <div className='col-lg-5 col-md-5 col-sm-12'>
            {editArticle && selectedArticle ? (
            <div className='mb-3'>
            <label htmlFor='title' className='form-label'>Title</label>
            <input type="text" className="form-control" id="title" placeholder='please enter title'
            value={title} onChange={e => setTitle(e.target.value)}></input>

            <label htmlFor='description' className='form-label mt-3'>Description</label>
            <textarea className='form-control' id="description" rows="18" 
            value={description} onChange={e => setDescription(e.target.value)}></textarea>

              <br/>
            <button className='btn btn-dark' onClick={updateArticle}>Update</button> 
          
            </div>
          ) : null}  
        </div>   

      </div>

    </div>
  )
}

export default Details
