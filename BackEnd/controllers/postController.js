import Post from '../db/models/postModel.js'
import User from '../db/models/userModel.js'

export const createPost = async (req, res) => {

    try {

        const { postedBy, text, img } = req.body;

        if (!postedBy && (!text || !img)) {

            return res.status(400).json({
                message: 'Cannot post without image or image'
            })

        }

        const user = await User.findById(postedBy)
        if (!user) {
            return res.satus(404).json({ message: "User not found" })
        }

        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: 'Unauthorized to create post'
            })
        }

        const maxLength = 500;

        if (text.length > maxLength) {
            return res.status(400).json({
                message: `Text must be less than ${maxLength} characters`
            })
        }

        const newPost = new Post({
            postedBy, text, img
        })

        await newPost.save()

        res.status(201).json({
            message: "post has been successfully created", newPost
        })



    }

    catch (err) {
        res.status(500).json({
            error: err.message,
        })

        console.log({
            error: err.message,
            path: err.stack

        })
    }

}




export const deletePost = async (req, res) => {
    try {

        const { id } = req.params
        const post = await Post.findById(id)

        if (!post) {
            return res.status(404).json({
                message: 'no post found'
            })
        }

        if (post.postedBy.toString() !== req.user._id.toString()) {
            return res.satus(401).json({
                message: "Unauthorized to delete post"
            })
        }

        await Post.findByIdAndDelete(id)


        res.status(200).json({
            message: 'Post has been deleted'
        })



    }

    catch (err) {
        res.status(500).json({
            error: err.message
        })

        console.log({
            message: err.message,
            path: err.stack
        })
    }
}

export const getPost = async (req, res) => {
    try {

        const { id } = req.params;

        const post = await Post.findById(id)

        if (!post) {
            res.status(404).json({
                message: "no post found"

            })
        }

        res.status(200).json({
            post
        })



    }

    catch (err) {
        res.status(500).json({
            error: err.message
        })

        console.log({
            message: err.message,
            path: err.stack
        })
    }
}


// export const editPost = async (req , res) => {

//     try{

//         const {id} = req.params;

//         const { text , image}  = req.body;







//     }

//     catch(err){
//         res.status(500).json({
//             error : err.message
//         })

//         console.log({
//             message : err.message,
//             path : err.stack
//         })
//     }


// }



export const likeUnlikePost = async (req, res) => {
    try {

        const { id } = req.params;

        const userId = req.user._id;

        const post = await Post.findById(id)

        if (!post) {
            return res.status(404).json({
                message: "post not found"
            })
        }


        const userLikedPost = post.likes.includes(userId);

        if (userLikedPost) {
            await Post.updateOne({ _id: id }, {
                $pull: { likes: userId }
            })

            res.status(200).json({
                message: "Post unliked successfully"
            })
        } else {
            post.likes.push(userId)
            await post.save()
            res.status(200).json({
                message: "Post liked successfully"
            })
        }

    } catch (error) {

        res.status(500).json({
            message: error.message

        })

        console.log({
            error: error.message,
            path: error.stack
        })

    }
}



export const replyToPost = async (req, res) => {
    try {

        const { text } = req.body;
        const id = req.params.id;
        const userId = req.user._id;
        const userProfilePic = req.user.profilePic;
        const username = req.user.username;

        if (!text) {
            return res.status(404).json({ message: "Text filed is required" })
        }

        const post = await Post.findById(id)

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            })
        }

        const reply = {
            userId, text, userProfilePic, username
        }

        post.replies.push(reply)

        await post.save();


        res.status(200).json({
            message: 'Reply added successfully'
        })



    } catch (error) {
        res.status(500).json({
            message: error.message

        })

        console.log({
            error: error.message,
            path: error.stack
        })

    }
}

export const getFeedPost = async (req, res) => {

    try {

        const userId = req.user._id;

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }



        const following = user.following

        const feedPosts = await Post.find({
            postedBy: { $in: following }
        }).sort({ createdAt: -1 })

        if (!feedPosts) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        }

        res.status(200).json({
            feedPosts
        })



    } catch (error) {

        res.status(500).json({
            error: error.message
        })

        console.log({
            error: error.message,
            path: error.stack
        })


    }

}