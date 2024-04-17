import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom'
import { useShowToast } from '../hooks/useShowToast'
import { useSetRecoilState } from 'recoil'
import { searchUser } from '../Atom/userSearch'

const UserPage = () => {

  const setUserSearchAtom = useSetRecoilState(searchUser)

  const [user , setUser] = useState(null)

  const {username} = useParams()

  const Toast = useShowToast()

  useEffect(()=>{
    const getUser = async()=>{
      try {
        const res = await fetch(`/api/users/profile/${username}`)
        const data = await res.json()

  
     
        if(data.error){
          return setUserSearchAtom(null)
        }

        setUserSearchAtom(data.user)
        
      } catch (error) {
        Toast("Error" , error.message , "error")
        
      }
    }

    getUser()
  } , [username])



  return (
    <>
    <UserHeader/>
    <UserPost likes = {1200} replies = {213} postImg = {"/WhatsApp Image 2024-03-27 at 9.23.55 AM.jpeg"} postTitle = {"This is my first post"}/>
    <UserPost likes = {124} replies = {13} postImg = {"/df49245d5acc44ccb81cd1dbc9a18e58_9366.webp"} postTitle = {"This is my first post"}/>
    <UserPost likes = {1200} replies = {213} postImg = {"/IMG20230628214237.jpg"} postTitle = {"This is my first post"}/>
   
    </>
  )
}

export default UserPage