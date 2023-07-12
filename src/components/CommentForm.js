import React, {useState} from 'react'
import APIService from './APIService'
import { useCookies } from "react-cookie";

function CommentForm(props) {

    const [enterComment, setEnterComment] = useState('')
    const [token, setToken, removeToken] = useCookies(['mytoken'])
    
const insertComment = (e) =>{
    e.preventDefault()
    const date = new Date()


    const articleid = props.selectedArticle.id
    const userid = props.userid
    console.log(articleid, userid, enterComment, date, token['mytoken'])

    APIService.InsertComment({articleid, userid, enterComment, date}, token['mytoken'])
    //.then(resp => props.InsertedComment(resp))
    

}

  return (
    <div>
    
        <div className="col-lg-2 col-md-2 col-sm-4">
            <button  className="btn btn-danger">Comment</button>
        </div>   

    <div>
        <div className='mb-3'>
         <form onSubmit={insertComment}>
            <textarea className='form-control' id="enterComment" rows="10" 
            value={enterComment} onChange={e => setEnterComment(e.target.value)} required></textarea>
            <br/>
            <button className='btn btn-dark'>Insert Comment</button>
         </form>
        </div>
    </div>
    </div>
  )
}

export default CommentForm
