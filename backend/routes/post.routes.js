import postModel from '../models/post.models.js'
import ApiResponse from '../utils/ApiResponse.util.js'
import {Router} from 'express'
const router = Router()
router.get('/:id', async (req, res) => {
	const {id} = req.params
	if (id) {
		const postData = await postModel.findOne({_id: id}).populate('user').exec();
		if (postData) {
			res.status(200).send(new ApiResponse('success', 200, postData, 'post data', null))
		} else {
			res.status(404).send(new ApiResponse('not found', 404, postData, 'post data', null))
		}
	}
})
export default router
