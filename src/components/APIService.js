

export default class APIService{
    static UpdateArticle(article_id, body, token){
        return fetch(`https://api-raita.onrender.com/api/articles/${article_id}/`, {
             'method':'PUT',
             headers: {
                'Content-type':'application/json',
                'Authorization': `Token ${token}` 
             },
             body:JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static InsertComment({article_id, userid, comments, date}, token){
        return fetch(`https://api-raita.onrender.com/api/comments/`, {
             'method':'POST',
             headers: {
                'Content-type':'application/json',
                'Authorization': `Token ${token}`
             },
             body:JSON.stringify({article_id, userid, comments, date})
        }).then(resp => resp.json())

    }

    static InsertArticle(body, token){

        return fetch(`https://api-raita.onrender.com/api/articles/`, {
             'method':'POST',
             headers: {
                'Content-type':'application/json',
                'Authorization': `Token ${token}`
             },
             body:JSON.stringify(body)
        }).then(resp => resp.json())

    }

    static DeleteArticle(article_id, token){
        return fetch(`https://api-raita.onrender.com/api/articles/${article_id}/`, {
             'method':'DELETE',
             headers: {
                'Content-type':'application/json',
                'Authorization': `Token ${token}`
             }
             
        }) 
    }


    static LoginUser(body){
        return fetch(`https://api-raita.onrender.com/auth/`, {
             'method':'POST',
             headers: {
                'Content-type':'application/json',
                
             },
             body:JSON.stringify(body)
             
        }).then(resp => resp.json())
          
          
    }


    static RegisterUser(body){
        return fetch(`https://api-raita.onrender.com/api/users/`, {
             'method':'POST',
             headers: {
                'Content-type':'application/json',
                
             },
             body:JSON.stringify(body)
             
        }).then(resp => resp.json())
    }
}