import Router from 'express'
import multerUpload from '../middlewares/multer.middleware.js'
import postModel from '../models/post.models.js'


import ApiResponse from '../utils/ApiResponse.util.js'

const router = Router()

// check if user is logged in or not

router.post('/post', multerUpload.array('posts', 10),async(req, res) => {
	const {caption,postvisibility} = req.body
	const postData = await postModel.create({caption, user: req?.user.id, media: req.files,postvisibility})
	res.json(new ApiResponse('success', 200, postData, 'user post data', null))
})

export default router
