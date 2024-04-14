import express from 'express'
import {createPost , getPost , deletePost , likeUnlikePost , replyToPost , getFeedPost} from '../controllers/postController.js'
import protectRouts from '../middlewares/protectRoutes.js'

const router = express.Router()


router.route('/feed').get( protectRouts , getFeedPost)

router.route('/createpost').post(protectRouts , createPost)
router.route('/delete/:id').delete(protectRouts , deletePost)
router.route('/:id').get(getPost)
router.route('/likeUnlike/:id').post(protectRouts , likeUnlikePost)
router.route('/reply/:id').post(protectRouts , replyToPost)



export default router