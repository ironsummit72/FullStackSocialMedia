import postModel from '../models/post.models.js'
import userModel from '../models/users.models.js'
import ApiResponse from '../utils/ApiResponse.util.js'
import fs from 'fs'
import {Router} from 'express'
const router = Router()

router.get('/:id', async (req, res) => {
	const {id} = req.params
	if (id) {
		const postData = await postModel.findOne({_id: id}).populate('user').exec()
		if (postData) {
			res.status(200).send(new ApiResponse('success', 200, postData, 'post data', null))
		} else {
			res.status(404).send(new ApiResponse('not found', 404, postData, 'post data', null))
		}
	}
})


router.post('/savepost/:postId', async (req, res) => {
	const {postId} = req.params
	const loggedInUser = req.user?.id
	if (postId && loggedInUser) {
		// check if the post exists in database
		const postData = await postModel.findById(postId)
		const userData = await userModel.findById(loggedInUser)
		if (postData && userData) {
			// both post data and user data are available then save then check if the post is already been saved by user or not
			if (userData.savedPosts?.indexOf(postData?._id) === -1) {
				userData.savedPosts?.push(postData?._id)
				await userData.save()
				res.status(200).json(new ApiResponse('success', 200, null, 'post saved successfully', null))
			} else {
				userData.savedPosts?.splice(userData?.savedPosts?.indexOf(postData._id), 1)
				await userData.save();
				res.status(200).json(new ApiResponse('success', 200, null, 'post unsaved successfully', null))
			}
		}
	}
})

router.get('/ispostsaved/:postId', async (req, res) => {
	const {postId} = req.params
	const loggedInUser = req.user?.id
	if (postId && loggedInUser) {
		// check if the post exists in database
		const postData = await postModel.findById(postId)
		const userData = await userModel.findById(loggedInUser)
		if (postData && userData) {
			// both post data and user data are available then save then check if the post is already been saved by user or not
			if (userData.savedPosts?.indexOf(postData?._id) === -1) {
				res.status(200).json(new ApiResponse('success', 200, false, 'post is not saved', null))
			} else {
				res.status(200).json(new ApiResponse('success', 200, true, 'post is saved ', null))
			}
		}
	}
})

router.delete('/:postId', async (req, res) => {
	const {postId} = req.params
	if (postId) {
		const postData = await postModel.findById(postId)
		if (postData.user.toString() === req.user.id) {
			const postDeleteData = await postModel.findByIdAndDelete(postId)
			if (postDeleteData) {
				postDeleteData?.media.map((media)=>{
					fs.unlink(media.path, (err)=>{
						console.error(err);
					})
				})
				res.status(200).json(new ApiResponse('success', 200, null, 'post deleted successfully', null))
			} else {
				res.status(400).json(new ApiResponse('bad request', 400, null, 'something went wrong', null))
			}
		} else {
			res.status(401).json(new ApiResponse('unauthorized', 401, null, 'you do not have access to delete this post', null))
		}
	}
})

export default router
