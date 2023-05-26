import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase/config';

function NavBar({ handleSignOut}) {

  const isValied = localStorage.getItem('isAuthenticated');
 
    return (
    <div className="top">
      <div className="topLeft">
        <div className="topIcon">
        <div className="topIconText">
          Writeopia</div></div>
          
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            {isValied && <Link className="navLink" to="/createBlog"> Create Blog</Link>}
            </li>
        
        </ul>
      </div>
      <div className="topRight">
        {isValied  ? (
          <div className="link">
            <img
              className="topImg"
              src={auth?.currentUser?.photoURL}
              alt=""
            />
          </div>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="topSearchIcon" to="/login">
                Login
              </Link>
            </li>
          </ul>
        )}
         {isValied && <button className="topSearchIcon" onClick={handleSignOut}>Logout</button>}
        
      </div>
    </div>
    )
}

export default NavBar
