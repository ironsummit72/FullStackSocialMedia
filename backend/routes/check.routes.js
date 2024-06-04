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
router.get('/isfollowing/:username', async function (req, res) {
	const {username} = req.params
	const loggedinUsername = req.user.username
	if (username) {
		const userData = await userModel.findOne({username})
		const loggedInUser = await userModel.findOne({username: loggedinUsername})
		if (userData && loggedInUser) {
			if (userData?.followers.includes(loggedInUser?._id)) {
				res.status(200).json(new ApiResponse('success', 200, true, `logged in user is following  ${username}`, null))
			} else {
				res.status(200).json(new ApiResponse('success', 200, false, `logged in user is not following  ${username}`, null))
			}
		}else{
			res.status(404).json(new ApiResponse('failed',400,null,'either username or logged in user not exist',null));
		}
	}else{
		res.status(400).json(new ApiResponse('failed',400,null,'invalid username or null',null));
	}
})
export default router
