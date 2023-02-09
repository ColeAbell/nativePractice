import AuthContent from '../Auth/AuthContent';
import React from 'react';

export default function LoginScreen() {
  function Authenticate(email, password) {
    console.log('email');
  }
  return <AuthContent isLogin onAuthenticate={Authenticate} />;
}
