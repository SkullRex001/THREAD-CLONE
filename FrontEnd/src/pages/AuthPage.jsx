import React from 'react'
import SignUp from '../components/SignUp'
import Login from '../components/Login'
import { authAtom } from '../Atom/authAtom'
import { useRecoilValue } from 'recoil'
const AuthPage = () => {
    const authScreenState = useRecoilValue(authAtom)
  return (
    <>

    {authScreenState === 'login' ? <Login/> : <SignUp/>}
   
    </>
  )
}

export default AuthPage