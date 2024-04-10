import React from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'

const UserPage = () => {
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