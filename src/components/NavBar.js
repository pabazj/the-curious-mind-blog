import React from 'react'
import { Link } from 'react-router-dom'

function NavBar({ isAuthenticated, handleSignOut, userData }) {
    // const isAuthenticated = true;
    return (
        // <nav >
        //     <Link to="/"> Home</Link>
        //     {isAuthenticated && <Link to="/createBlog"> Create Blog</Link>}
        //     {!isAuthenticated ? <Link to="/login"> Login</Link> : <button onClick={handleSignOut}><img src={userData?.photoURL
        //     } /></button>}
        // </nav>
    <div className="top">
      <div className="topLeft">
        <div className="topIcon">
        <Link className="navLink" to="/">
          Writeopia</Link></div>
          
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            {isAuthenticated && <Link className="navLink" to="/createBlog"> Create Blog</Link>}
            </li>
        
        </ul>
      </div>
      <div className="topRight">
        {isAuthenticated  ? (
          <div className="link">
            <img
              className="topImg"
              src={userData?.photoURL}
              alt=""
            />
          </div>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
          </ul>
        )}
         {isAuthenticated && <button className="topSearchIcon" onClick={handleSignOut}>Logout</button>}
        
      </div>
    </div>
    )
}

export default NavBar
