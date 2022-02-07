
import './Login.css'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from '../../firebaseConfig'
import { actionTypes } from '../../reducer'
import { useStateValue } from '../../StateProvider'
import React from 'react';
import { Button } from '@mui/material'

const Login = () => {
    const [{}, dispatch] = useStateValue()

    const signIn = () => {
        const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
   dispatch({
       type: actionTypes.SET_USER,
       user: result.user,
   })
   console.log(result);
    const user = result.user;
    // ...
  }).catch((error) => {
  console.log(error)
    // ...
  });
    }
  return <div className="login">
      <div className= "login-container">
      <img
           src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt=""
        />
         <div className="login-text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button onClick={signIn}>
                    Sign in with Google
                </Button>
      </div>
  </div>;
};

export default Login;
