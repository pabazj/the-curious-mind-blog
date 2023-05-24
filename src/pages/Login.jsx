import React, { useEffect } from 'react'
import { auth, provider } from '../firebase/config'
import { signInWithPopup, setPersistence, browserSessionPersistence } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Login({ setIsAuthenticated, setUserData }) {
  const navigate = useNavigate()

  useEffect(() => {
    setPersistence(auth, browserSessionPersistence);
  }, []);

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(res => {
        localStorage.setItem("isAuthenticated", true)
        setIsAuthenticated(true)
        setUserData(res?.user)
        navigate('/')
      })
  }

  return (
    <div className="loginPage">
      <p>Sign in with Google</p>
      <button className="login-with-google-btn" onClick={handleSignIn}>
        Google
      </button>
    </div>
  )
}

export default Login
