import userModel from '../models/users.models.js'
import Router from 'express'
import ApiResponse from '../utils/ApiResponse.util.js'
const router = new Router()
router.get('/displaypicture', async (req, res) => {
	const {username} = req.user
	if (username) {
		const userData = await userModel.findOne({username})
		if (userData.displaypicture) {
			res.json(new ApiResponse('success', 200, true, 'displaypicture exists', null))
		} else {
			res.json(new ApiResponse('success', 200, false, 'displaypicture not exists', null))
		}
	}
})
router.get('/coverpicture', async (req, res) => {
	const {username} = req.user
	if (username) {
		const userData = await userModel.findOne({username})
		if (userData.coverpicture) {
			res.json(new ApiResponse('success', 200, true, 'displaypicture exists', null))
		} else {
			res.json(new ApiResponse('success', 200, false, 'displaypicture not exists', null))
		}
	}
})
export default router
