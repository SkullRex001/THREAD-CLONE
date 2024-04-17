import express from 'express'
import {signupUser  , loginUser , logout , followUnfollowUser , updateUser , searchUserProfile , getUserProfile}from '../controllers/userController.js'

import protectRouts from '../middlewares/protectRoutes.js'

const router = express.Router()


router.route('/profile/:username').get(getUserProfile)
router.route('/getuser').get(searchUserProfile)
router.route('/signup').post(signupUser)
router.route('/login').post(loginUser)
router.route('/logout').get(protectRouts , logout)
router.route('/follow/:id').get(protectRouts , followUnfollowUser)
router.route('/updateprofile/:id').post(protectRouts , updateUser)




export default router













