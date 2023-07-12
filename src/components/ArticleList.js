import React from 'react'
import './ArticleList.css'

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { selectArticle } from '../features/articleSlice';
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { logout } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';



function ArticleList(props) {

 const [token, removeToken] = useCookies(['mytoken'])

 const user = useSelector(selectUser)
 const userid = user?.displayName

 let history = useNavigate()
 const dispatch = useDispatch();


 const logoutBtn = () => {
    
  removeToken(['mytoken'])
  dispatch(logout());
  history('/')
}

 const openArticle = (id, title, description, likes, userid) => {

      dispatch(
        selectArticle(
            {id, title, description, likes, userid} 
        )
    ); 
      
      history("/articles/details")
    }

  return (
    <div>

    {props.articles && props.articles.map?.(article => {
        return (
          <div key={article.id} className='article'>

            <div onClick={() => openArticle(article.id, article.title, article.description, article.likes, article.userid)}>
              <div className='title__date d-flex'>
                <h3>{article.title} <span><i> by { userid != article.userid ? article.userid : 'me'}</i> </span></h3>
                <p>{article.date}</p>
              </div>
              { article.description.length <= 30 ? (
              <p> {article.description}</p>) : (<p>{article.description.substr(0,30)} <i>... read more</i></p>) }

            </div>
            {/* <hr className="hrclass pr-5" /> */}
          </div>
        )
      })}
      
    </div>
  )
}


export default ArticleList
