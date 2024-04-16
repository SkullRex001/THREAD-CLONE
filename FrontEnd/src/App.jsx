
import './App.css'
import { Container } from '@chakra-ui/react'
import UserPage from './pages/UserPage'
import PostPage from './pages/PostPage'
import {Routes , Route, Navigate} from 'react-router-dom'
import Header from './components/Header'
import AuthPage from './pages/AuthPage'
import { userAtom } from './Atom/userAtom'
import { useRecoilValue } from 'recoil'
import HomePage from './pages/HomePage'
import LogoutButton from './components/LogoutButton'
import UpdateProfilePage from './pages/UpdateProfilePage'


function App() {
   const user = useRecoilValue(userAtom)
   console.log(user)

  return (
    <>
    <Container maxW = '620px'>
    <Header/>
      <Routes>

        <Route path = {'/'} element = {user? <HomePage/> : <Navigate to={'/auth'}/>}/>

        <Route path='/auth' element = {!user? <AuthPage/> : <Navigate to={'/'}/>}/>
        <Route path = '/:username' element = {<UserPage/>}/>
        <Route path = '/:username/post/:pid' element = {<PostPage/>}/>
        <Route path='/update' element = {user? <UpdateProfilePage/> : <Navigate to={'/auth'}/>}/>
      </Routes>

      {user && <LogoutButton/>}

    </Container>
    
    </>
  )
}

export default App
