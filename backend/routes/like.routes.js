import postModel from '../models/post.models.js'
import userModel from '../models/users.models.js'
import ApiResponse from '../utils/ApiResponse.util.js'
import {Router} from 'express'
const router = Router()

router.post('/:postId/like', async function (req, res) {
	const loggedInUser = req?.user.id
	const {postId} = req.params
	if (loggedInUser && postId) {
		const userData = await userModel.findById(loggedInUser)
		const postData = await postModel.findById(postId)
		const indexOfUserData = userData?.likedPosts.indexOf(postId)
		const indexOfPostData = postData?.likes.indexOf(userData?.id)
		if (indexOfUserData === -1 && indexOfPostData == -1) {
			userData.likedPosts.push(postId)
			await userData.save()
			postData.likes.push(userData.id)
			await postData.save()
			res.status(200).json(new ApiResponse(200, 'success', null, `you liked this post`, null))
		} else {
			userData.likedPosts.splice(indexOfUserData, 1)
			await userData.save()
			postData.likes.splice(indexOfPostData, 1)
			await postData.save()
			res.status(200).json(new ApiResponse(200, 'success', null, `you unliked this post`, null))
		}
	}
})
// this route checks if the post is already liked or not.
router.get('/:postId/isliked', async function (req, res) {
	const loggedInUser = req?.user.id
	const {postId} = req.params
	if (loggedInUser && postId) {
		const userData = await userModel.findById(loggedInUser)
		const postData = await postModel.findById(postId)
		const indexOfUserData = userData?.likedPosts.indexOf(postId)
		const indexOfPostData = postData?.likes.indexOf(userData?.id)
		if (indexOfUserData === -1 && indexOfPostData === -1) {
			res.status(200).json(new ApiResponse(200, 'success', false, `post is not liked`, null))
		} else {
			res.status(200).json(new ApiResponse(200, 'success', true, `post is liked`, null))
		}
	}
})
export default router
