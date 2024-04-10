import express from 'express'
import {signupUser  , loginUser , logout , followUnfollowUser , updateUser}from '../controllers/userController.js'

import protectRouts from '../middlewares/protectRoutes.js'

const router = express.Router()



router.route('/signup').post(signupUser)
router.route('/login').post(loginUser)
router.route('/logout').get(protectRouts , logout)
router.route('/follow/:id').get(protectRouts , followUnfollowUser)
router.route('/updateprofile/:id').post(protectRouts , updateUser)




export default router













