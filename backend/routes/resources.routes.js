import ApiResponse from '../utils/ApiResponse.util.js'
import userModel from '../models/users.models.js'
import {Router} from 'express'
import fs from 'fs'
import postModel from '../models/post.models.js'
const router = Router()

router.get('/displaypicture', async (req, res) => {
	const {username} = req.user
	const size = parseInt(req.query.size) || 320
	if (username && size) {
		const userData = await userModel.findOne({username})
		const readableStream = fs.createReadStream(`./uploads/displaypicture/${size}/${userData?.displaypicture}`)
		const mimetype = userData?.displaypicture.toString().split('.')[1]
		res.setHeader('Content-Type', `image/${mimetype}`)
		readableStream.pipe(res)
	} else if (username) {
		const userData = await userModel.findOne({username})
		const readableStream = fs.createReadStream(`./uploads/displaypicture/${userData?.displaypicture}`)
		const mimetype = userData?.displaypicture.toString().split('.')[1]
		res.setHeader('Content-Type', `image/${mimetype}`)
		readableStream.pipe(res)
	} else {
		res.status(400).json(new ApiResponse('error', 400, null, 'usernotfound or invalid size', null))
	}
})
router.get('/displaypicture/:username', async (req, res) => {
	const {username} = req.params
	const size = parseInt(req.query.size) || 320
	if (username && size) {
		const userData = await userModel.findOne({username})
		if (userData) {
			const readableStream = fs.createReadStream(`./uploads/displaypicture/${size}/${userData.displaypicture}`)
			const mimetype = userData?.displaypicture.toString().split('.')[1]
			res.setHeader('Content-Type', `image/${mimetype}`)
			readableStream.pipe(res)
		}
	} else if (username) {
		const userData = await userModel.findOne({username})
		if (userData) {
			const readableStream = fs.createReadStream(`./uploads/displaypicture/${userData.displaypicture}`)
			const mimetype = userData?.displaypicture.toString().split('.')[1]
			res.setHeader('Content-Type', `image/${mimetype}`)
			readableStream.pipe(res)
		}
	} else {
		res.status(400).json(new ApiResponse('error', 400, null, 'please provide username', null))
	}
})
router.get('/coverpicture', async (req, res) => {
	const {username} = req.user
	if (username) {
		const userData = await userModel.findOne({username})
		if (userData) {
			const readableStream = fs.createReadStream(`./uploads/coverpicture/${userData.coverpicture}`)
			const mimetype = userData?.coverpicture.toString().split('.')[1]
			res.setHeader('Content-Type', `image/${mimetype}`)
			readableStream.pipe(res)
		}
	} else {
		res.status(400).json(new ApiResponse('error', 400, null, 'usernotfound', null))
	}
})
router.get('/coverpicture/:username', async (req, res) => {
	const {username} = req.params
	if (username) {
		const userData = await userModel.findOne({username})
		if (userData) {
			const readableStream = fs.createReadStream(`./uploads/coverpicture/${userData.coverpicture}`)
			const mimetype = userData?.coverpicture.toString().split('.')[1]
			res.setHeader('Content-Type', `image/${mimetype}`)
			readableStream.pipe(res)
		}
	} else {
		res.status(400).json(new ApiResponse('error', 400, null, 'usernotfound', null))
	}
})
router.get('/photos/:username', async (req, res) => {
	const {username} = req.params
	if (username) {
		const userData = await userModel.findOne({username: username})
		if (userData) {
			if (req.query.limit) {
				const postData = await postModel.aggregate([
					{
						$unwind: {
							path: '$media',
						},
					},
					{
						$match: {
							'media.mimetype': {
								$in: ['image/jpg', 'image/jpeg', 'image/jpg', 'image/webp'],
							},
						},
					},
					{
						$match: {
							user: userData._id,
						},
					},
					{
						$sort:
							/**
							 * Provide any number of field/order pairs.
							 */
							{
								createdAt: -1,
							},
					},
					{$limit: parseInt(req.query?.limit)},
				])
				if (postData) {
					res.status(200).json(new ApiResponse('success', '200', postData, `photos  of ${username} `, null))
				} else {
					res.status(200).json(new ApiResponse('success', '200', postData, `photos not available of ${username} `, null))
				}
			} else {
				const postData = await postModel.aggregate([
					{
						$unwind: {
							path: '$media',
						},
					},
					{
						$match: {
							'media.mimetype': {
								$in: ['image/jpg', 'image/jpeg', 'image/jpg', 'image/webp'],
							},
						},
					},
				])
				if (postData) {
					res.status(200).json(new ApiResponse('success', '200', postData, `${username} photos`, null))
				} else {
					res.status(200).json(new ApiResponse('success', '200', postData, `photos not available of ${username} `, null))
				}
			}
		}
	}
})
router.get('/videos/:username', async (req, res) => {
	const {username} = req.params
	if (username) {
		const userData = await userModel.findOne({username: username})
		if (userData) {
			const postData = await postModel.aggregate([
				{
					$unwind: {
						path: '$media',
					},
				},
				{
					$match: {
						'media.mimetype': {
							$in: ['video/mp4', 'video/webm', 'video/ogg', 'video/*'],
						},
					},
				},
			])
			if (postData) {
				res.status(200).json(new ApiResponse('success', '200', postData, `${username} photos`, null))
			} else {
				res.status(200).json(new ApiResponse('success', '200', postData, `videos not available of ${username} `, null))
			}
		}
	}
})

export default router
