import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import CreateBlog from './pages/CreateBlog';
import Blog from './pages/Blog'

import { useState } from 'react';
import { signOut } from 'firebase/auth'
import { auth } from './firebase/config';
import PrivateRoutes from './utils/ProtectedRoute';
import NavBar from './components/NavBar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState(null)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear()
        setIsAuthenticated(false)
        window.location.pathname = "/";
      })
  }


  return (
    <>
      <Router>
      <NavBar
        handleSignOut={handleSignOut}
        userData={userData} />

        <Routes>
          <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
            <Route element={<CreateBlog />} path="/createBlog" />
          </Route>
          {/* <Route element={<CreateBlog />} path="/createBlog" /> */}
          <Route element={<Home isAuthenticated={isAuthenticated} />} path="/" exact />
          <Route element={<Login setUserData={setUserData} setIsAuthenticated={setIsAuthenticated} />} path="/login" />
          <Route element={<Blog />} path="/viewBlog" exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
