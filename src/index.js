import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './app/store';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Login from './components/Login';
import Details from './components/Details'
import {CookiesProvider} from 'react-cookie'
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import Footer from './components/Footer'


function Router(){
  return(
    <Provider store={store}>
      <CookiesProvider>
      <BrowserRouter>
  
        <Routes>
          <Route path = '/'  element={<Login />} />
          <Route path = '/articles'  element={<App />} />
          <Route path = '/articles/details' element = {<Details />}/>
        </Routes>
        
      </BrowserRouter>
      <Footer />
    </CookiesProvider>
    </Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
