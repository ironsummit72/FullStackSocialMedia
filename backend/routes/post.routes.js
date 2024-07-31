import postModel from '../models/post.models.js'
import ApiResponse from '../utils/ApiResponse.util.js'
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

router.delete('/:postId', async (req, res) => {
	const {postId} = req.params
	if (postId) {
		const postData = await postModel.findById(postId)
		if (postData.user.toString() === req.user.id) {
			const postDeleteData = await postModel.findByIdAndDelete(postId)
			if (postDeleteData) {
				res.status(200).send(new ApiResponse('success', 200, null, 'post deleted successfully', null))
			} else {
				res.status(400).send(new ApiResponse('bad request', 400, null, 'something went wrong', null))
			}
		} else {
			res.status(401).send(new ApiResponse('unauthorized', 401, null, 'you do not have access to delete this post', null))
		}
	}
})

export default router
