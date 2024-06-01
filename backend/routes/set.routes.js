import Router from 'express'
const router = Router()
import multer from '../middlewares/multer.middleware.js'
import userModel from '../models/users.models.js'
import ApiResponse from '../utils/ApiResponse.util.js'
router.post('/dp', multer.single('displaypicture'), async (req, res) => {
	if (req.user) {
		const data = await userModel.findOne({username: req.user.username})
		if (data) {
			const updatedData = await userModel.updateOne(
				{username: req.user.username},
				{$set: {displaypicture: req.file.filename}},
			)
			if (updatedData) {
				res.status(200).json(new ApiResponse('success', 200, null, 'user display picture set successfully', null))
			}
		} else {
			res.status(400).json(new ApiResponse('failed', 400, null, 'user not found', null))
		}
	} else {
		res.status.apply(401).json(new ApiResponse('failed', 401, null, 'user not found please login', null))
	}
})
router.post('/cover', multer.single('coverpicture'), async (req, res) => {
	if (req.user) {
		const data = await userModel.findOne({username: req.user.username})
		if (data) {
			const updatedData = await userModel.updateOne(
				{username: req.user.username},
				{$set: {coverpicture: req.file.filename}},
			)
			if (updatedData) {
				res.status(200).json(new ApiResponse('success', 200, null, 'user coverpicture set successfully', null))
			}
		} else {
			res.status(400).json(new ApiResponse('failed', 404, null, 'user not found', null))
		}
	} else {
		res.status.apply(401).json(new ApiResponse('failed', 401, null, 'user not found please login', null))
	}
})
router.post('/profileintro', async (req, res) => {
	const {profession, studiedat, wentto, livesin, relationshipstatus} = req.body
	if (req.user) {
		const data = await userModel.findOne({username: req.user.username})
		if (data) {
			const dbResponse = await userModel.updateOne(
				{username: req.user.username},
				{
					$set: {profession, studiedAt: studiedat, wentTo: wentto, livesIn: livesin, RelationshipStatus: relationshipstatus},
				},
			)
			if (dbResponse) {
				res.status(200).json(new ApiResponse('success', 200, null, 'user intro details updated successfully', null))
			}
		} else {
			res.status(404).json(new ApiResponse('failed', 404, null, 'user not found', null))
		}
	} else {
		res.status.apply(401).json(new ApiResponse('failed', 401, null, 'user not found please login', null))
	}
})

export default router
