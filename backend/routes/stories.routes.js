import {Router} from 'express'
import ApiResponse from '../utils/ApiResponse.util.js'
import multerUpload from '../middlewares/multer.middleware.js'
import StoryModel from '../models/stories.models.js'
import userModel from '../models/users.models.js'
import fs from 'fs'
import cropVideo from '../utils/ffmpegDownScaleStories.util.js'
import path from 'path'

// import the stories model here.
const router = Router()

router.get('/:username', async function (req, res) {
	const {username} = req.params
	if (username) {
		// import the stories model and find the stories of specific user
		const userData = await userModel.findOne({username})
		if (userData) {
			const storyData = await StoryModel.find({user: userData._id}).populate({path: 'user', select: '-password'})
			if (storyData) {
				res.status(200).json(new ApiResponse(200, 'success', storyData, `stories of ${username}`, null))
			} else {
				res.status(404).json(new ApiResponse(404, 'success', storyData, `no stories of ${username}`, null))
			}
		}
	}
})
router.get('/sid/:storyId', async function (req, res) {
	const {storyId} = req.params
	if (storyId) {
		try {
			const storyData = await StoryModel.findById(storyId).populate({path: 'user', select: '-password'})
			if (storyData) {
				res.status(200).json(new ApiResponse('success', 200, storyData, 'stories data', null))
			} else {
				res.status(200).json(new ApiResponse('success', 200, storyData, 'stories data', null))
			}
		} catch (err) {
			res.status(400).json(new ApiResponse('bad request', 400, err, 'stories data', null))
			console.error(err)
		}
	}
})
router.post('/create', multerUpload.single('story'), async function (req, res) {
	const {caption} = req.body
	const loggedInUser = req?.user.username
	const outputfilepath = path.join('uploads/story', `${req.file.filename}`)
	if (req.file.mimetype.split('/')[0] === 'video') {
		await cropVideo(req.file.path, outputfilepath)

	}

	if (req.file && loggedInUser) {
		const userData = await userModel.findOne({username: loggedInUser})
		if (userData) {
			const storyResponse = await StoryModel.create({user: userData._id, caption: caption, content: req.file})
			if (storyResponse) {
				res.status(201).json(new ApiResponse('success', 201, storyResponse, 'story added', null))
			} else {
				res.status(500).json(new ApiResponse('error', 500, storyResponse, 'story cannot be added', null))
			}
		}
	}
})

router.post('/addviews/:storyId', async function (req, res) {
	const {storyId} = req.params
	const loggedInUser = req?.user.username
	console.log('story Id ', storyId)
	if (storyId && loggedInUser) {
		try {
			const storyData = await StoryModel.findById(storyId.trim())
			const userData = await userModel.findOne({username: loggedInUser})
			if (storyData && userData) {
				if (storyData.user !== userData._id) {
					if (storyData.views.indexOf(userData._id) === -1) {
						storyData.views.push(userData._id)
						await storyData.save()
						res
							.status(200)
							.json(new ApiResponse('success', 200, null, `this ${storyData._id} is viewed by ${userData.id}`, null))
					} else {
						res.status(200).json(new ApiResponse('success', 200, null, `already viewed`, null))
					}
				} else {
					res.status(200).json(new ApiResponse('success', 200, null, `loggin user viewing the story`, null))
				}
			} else {
				res.status(404).json(new ApiResponse('not found', 404, null, `storydata or userData not found`, null))
			}
		} catch (error) {
			console.error(error)
		}
	}
})

router.get('/showviews/:storyId', async function (req, res) {
	const {storyId} = req.params
	if (storyId) {
		try {
			const storyData = await StoryModel.findById(storyId)
				.populate({path: 'views', select: '-password'})
				.select('-caption ')
			res.status(200).json(new ApiResponse('success', 200, storyData, 'storyviews', null))
		} catch (error) {
			console.error(error)
		}
	} else {
		res.status(404).json(new ApiResponse('not found', 404, null, 'story not found', null))
	}
})

router.get('/hasstory/:username', async function (req, res) {
	const {username} = req.params
	if (username) {
		// import the stories model and find the stories of specific user
		const userData = await userModel.findOne({username})
		if (userData) {
			const storyData = await StoryModel.find({user: userData._id}).populate({path: 'user', select: '-password'})
			if (storyData.length > 0) {
				res.status(200).json(new ApiResponse(200, 'success', true, `stories of ${username}`, null))
			} else {
				res.status(404).json(new ApiResponse(404, 'success', false, `no stories of ${username}`, null))
			}
		}
	}
})

router.delete('/:storyId', async function (req, res) {
	const {storyId} = req.params
	if (storyId) {
		const storyData = await StoryModel.findByIdAndDelete(storyId)
		if (storyData) {
			fs.unlink(`./uploads/story/${storyData.content?.filename}`, (err) => {
				console.error(err)
			})
			res.status(204).json(new ApiResponse('no-content', 204, null, 'story deleted successfully', null))
		} else {
			res.status(404).json(new ApiResponse('not found', 204, null, 'story not found', null))
		}
	}
})
export default router
