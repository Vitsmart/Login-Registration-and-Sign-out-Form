import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Router } from 'react-router-dom';
import { history } from './helpers/history';
import {logout} from "./actions/auth"
import { clearMessage} from "./actions/message"



function App() {
  const {user: currentUser} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect (() => {
    history.listen((location) => {
      dispatch(clearMessage());
    })
  },[dispatch]);

  const logOut = () => {
    dispatch(logout());
  };
  
  
  return (
    <Router history={history}>
    <div>
      <nav>
        {currentUser && (
          <li className='nav-item'>
            
            <Link to={"/user"} className="nav-link">Home</Link>
          </li>
        )}
        {currentUser ? (
          <div className='navbar-nav ml-auto'>
      <li>
        <link to={"/profile"} className="nav-link">{currentUser.username}</link>
      </li>
     <li className='nav-item'>
      <a href='/login' className='nav-link' onClick={logOut}>logOut</a></li>
    </div>
  ): (
    <div className='navbar-nav ml-auto'>
      <li className='nav-item'>
        <Link to={'/login'} className='nav-link'>Login</Link>

      </li>
      <li className='nav-item'>
        <Link to={"/register"} className="nav-link">Sign Up</Link>

      </li>
    </div>
  )}
  </nav>
  <div>
    <switch>
      <Route exact path={["/", "/home"]} component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/profile' component={Profile} />

    </switch>
  </div>
  </div>
  </Router>
  )
}

export default App;
