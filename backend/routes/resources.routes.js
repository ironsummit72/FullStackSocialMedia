import ApiResponse from '../utils/ApiResponse.util.js'
import userModel from '../models/users.models.js'
import Router from 'express'
import fs from 'fs'
const router = Router()

router.get('/displaypicture', async (req, res) => {
	const {username} = req.user
	if (username) {
		const userData = await userModel.findOne({username})
		const readableStream = fs.createReadStream(`./uploads/displaypicture/${userData.displaypicture}`)
		readableStream.on('data', (chunk) => res.write(chunk))
		readableStream.on('end', () => res.end())
		readableStream.on('error', (err) => res.json(new ApiResponse('error', 400, err.message, 'file not found', null)))
	} else {
		res.status(400).json(new ApiResponse('error', 400, null, 'usernotfound', null))
	}
})
router.get('/displaypicture/:username', async (req, res) => {
	const {username} = req.params
	if (username) {
		const userData = await userModel.findOne({username})
		if (userData) {
			const readableStream = fs.createReadStream(`./uploads/displaypicture/${userData.displaypicture}`)
			readableStream.on('data', (chunk) => res.write(chunk))
			readableStream.on('end', () => res.end())
			readableStream.on('error', (err) => res.json(new ApiResponse('error', 400, err.message, 'file not found', null)))
		}
	} else {
		res.status(400).json(new ApiResponse('error', 400, null, 'please provide username', null))
	}
})
router.get('/coverpicture', async (req, res) => {
	const {username} = req.user
	if (username) {
		const userData = await userModel.findOne({username})
		if(userData)
			{
				const readableStream = fs.createReadStream(`./uploads/coverpicture/${userData.coverpicture}`)
				readableStream.on('data', (chunk) => res.write(chunk))
				readableStream.on('end', () => res.end())
				readableStream.on('error', (err) => res.json(new ApiResponse('error', 400, err.message, 'file not found', null)))
			}
	} else {
		res.status(400).json(new ApiResponse('error', 400, null, 'usernotfound', null))
	}
})
router.get('/coverpicture/:username', async (req, res) => {
	const {username} = req.params
	if (username) {
		const userData = await userModel.findOne({username})
		if(userData) {
			const readableStream = fs.createReadStream(`./uploads/coverpicture/${userData.coverpicture}`)
			readableStream.on('data', (chunk) => res.write(chunk))
			readableStream.on('end', () => res.end())
			readableStream.on('error', (err) => res.json(new ApiResponse('error', 400, err.message, 'file not found', null)))
		}
	} else {
		res.status(400).json(new ApiResponse('error', 400, null, 'usernotfound', null))
	}
})

export default router
