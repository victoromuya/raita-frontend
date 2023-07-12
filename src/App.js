
import './App.css';
import { useState, useEffect } from "react";
import ArticleList from './components/ArticleList';
import Form from './components/Form'
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { login, selectUser } from './features/userSlice';
import { useDispatch } from 'react-redux';
import { logout } from './features/userSlice';
import Header from './components/Header';
import SearchIcon from '@material-ui/icons/Search';

function App() {
  
  const [articles, setArticles] = useState([])
  const [editArticle, setEditArticle] = useState(null)
  const [token, setToken, removeToken] = useCookies(['mytoken'])
  const[formDisplay, setFormDisplay] = useState(false)

  const dispatch = useDispatch()

  const user = useSelector(selectUser)
  const userid = user?.displayName
    
  
  let history = useNavigate()

  useEffect(() => {
      if(!token['mytoken']){
         history('/') 
        //window.location.href = '/'
      }

    else {
      fetch('https://api-raita.onrender.com/api/articles/', {
        'method':'GET', headers:{
          'Content-type':'application/json',
          'Authorization': `Token ${token['mytoken']}`
        }
      })
      .then(resp => resp.json())
      
      .then(resp =>setArticles(resp))
      .catch(error => console.log(error))
    }
    }, [token])


  const InsertedInformation = (article) =>{
    const new_articles = [...articles, article]
    setArticles(new_articles)
    setFormDisplay(false)
  }

  const logoutBtn = () => {
    
    removeToken(['mytoken'])
    dispatch(logout());
    history('/')
  }

  const displayForm = () => {
    setFormDisplay(true)
    
  }

 
  

  return (
    <div className="App">
     <Header userid={userid} logoutBtn={logoutBtn}/>
     
     <div className="header_search ">
          <SearchIcon />
          <input type="text" placeholder='Search'/>
        </div>
      <div className="row app_body">
      <h5 onClick={displayForm}>Create new article</h5>
        
        {formDisplay ? (
          <div className="col-lg-5 col-md-5 col-sm-12 form__mobile">
          <Form InsertedInformation={InsertedInformation}/>
        </div>
        ) : null }

        <div className="col-lg-5 col-md-5 col-sm-12 article__body">
          <ArticleList articles = {articles} />
        </div>
        <div className="col-lg-7 col-md-7 col-sm-12 form__section">
          <Form InsertedInformation={InsertedInformation}/>
        </div>
      </div>
    </div>
  );
}

export default App;
