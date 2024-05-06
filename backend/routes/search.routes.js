import Router from 'express'
import userModel from '../models/users.models.js'
import ApiResponse from '../utils/ApiResponse.util.js'
const router = Router()

router.get('/users', async (req, res) => {
	const {search} = req.query
	if (search) {
		const regexFullName = new RegExp(search, 'i')
		const data = await userModel.aggregate([
			{
				$addFields: {
					fullName: {
						$concat: ['$firstname', ' ', '$lastname'],
					},
				},
			},
			{
				$match: {
					$or: [
						{
							fullName: regexFullName,
						},
						{
							username: regexFullName,
						},
					],
				},
			},
		])
		res.status(200).json(new ApiResponse('success', 200, data, 'search results', null))
	}
})

export default router
