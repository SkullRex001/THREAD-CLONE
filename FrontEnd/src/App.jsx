
import './App.css'
import { Container } from '@chakra-ui/react'
import UserPage from './pages/UserPage'
import PostPage from './pages/PostPage'
import {Routes , Route, Navigate, Link} from 'react-router-dom'
import Header from './components/Header'
import AuthPage from './pages/AuthPage'
import { userAtom } from './Atom/userAtom'
import { useRecoilValue } from 'recoil'
import HomePage from './pages/HomePage'
import LogoutButton from './components/LogoutButton'
import UpdateProfilePage from './pages/UpdateProfilePage'
import { searchUser } from './Atom/userSearch'
import UserNotFound from './components/UserNotFound'




function App() {
   const user = useRecoilValue(userAtom)

  return (
    <>
    <Container maxW = '620px'>
    <Header/>
      <Routes>

        <Route path = {'/'} element = {user? <HomePage/> : <Navigate to={'/auth'}/>}/>

        <Route path='/auth' element = {!user? <AuthPage/> : <Navigate to={'/'}/>}/>
        <Route path = '/:username' element = {!user?<AuthPage/> :<UserPage/> }/>
        <Route path = '/:username/post/:pid' element = {<PostPage/>}/>
        <Route path='/update' element = {user? <UpdateProfilePage/> : <Navigate to={'/auth'}/>}/>
      </Routes>

      {user && <Link to={"/auth"}><LogoutButton/></Link>}

    </Container>
    
    </>
  )
}

export default App
