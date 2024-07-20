import Router from 'express'
import multerUpload from '../middlewares/multer.middleware.js'
import postModel from '../models/post.models.js'
import TagsModel from '../models/tags.models.js'

import ApiResponse from '../utils/ApiResponse.util.js'

const router = Router()

// check if user is logged in or not

router.post('/post', multerUpload.array('posts', 10), async (req, res) => {
	const {caption, postvisibility} = req.body
	const Hashtags = caption
		.split(' ')
		.filter((word) => /^\#/.test(word))
		.map((name) => name.slice(1));
	const postData = await postModel.create({caption, user: req?.user.id, media: req.files, postvisibility});
	const filterDuplicateHashTags = Hashtags.filter((items, index) => Hashtags.indexOf(items) === index);
	postData.hashtags=[...filterDuplicateHashTags];
	postData?.save();
	if (filterDuplicateHashTags.length > 0) {
		filterDuplicateHashTags.forEach(async (hashTags) => {
			const hashTagData = await TagsModel.findOne({tagName: hashTags.trim()})
			if (hashTagData === null) {
				const createHashTag = await TagsModel.create({tagName: hashTags.trim()})
				if (createHashTag?.posts.indexOf(postData?._id) === -1) {
					createHashTag?.posts.push(postData?._id)
					await createHashTag?.save()
				}
			} else {
				if (hashTagData?.posts.indexOf(postData?._id) === -1) {
					hashTagData?.posts.push(postData?._id)
					await hashTagData.save()
				}
			}
		})
	}
	res.json(new ApiResponse('success', 200, postData, 'user post data', null));
})

export default router
