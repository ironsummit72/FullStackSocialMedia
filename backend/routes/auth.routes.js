import Router from 'express'
import userModel from '../models/users.models.js'
import ApiResponse from '../utils/ApiResponse.util.js'
import {verifyPassword} from '../utils/hashGen.utils.js'
import {createToken} from '../utils/JwtAuth.utils.js'
const router = Router()

router.post('/login', async (req, res) => {
	const {username, password} = req.body
	const userData = await userModel.findOne({username})
	if (userData) {
		const [hash, salt] = userData.password.split('.')
		const isPasswordCorrect = verifyPassword(password, hash, salt)
		if (isPasswordCorrect) {
			res.cookie('sessionId', createToken({id: userData._id, username: userData.username}), {httpOnly: true})
			res.send('login success')
		} else {
			res.status(400).json(new ApiResponse('error', 400, null, 'incorrect password', null))
		}
	} else {
		res.status(401).json(new ApiResponse('error', 401, 'sorry user not found please register first', '/register'))
	}
})
router.post('/register', async (req, res) => {
	const {username, email, firstname, lastname, password, cpassword} = req.body
	if (!(username && email && firstname && lastname && password && cpassword)) {
		res
			.status(400)
			.json(
				new ApiResponse(
					'error',
					400,
					null,
					'either username,email,firstname,lastname,password,cpassword is missing please check again',
					null,
				),
			)
	}
	const userDataUsermeEmail = await userModel.findOne({$or: [{username}, {email}]})
	if (userDataUsermeEmail) {
		if (userDataUsermeEmail.username === username) {
			res
				.status(400)
				.json(new ApiResponse('error', 400, null, 'username already exists please user some different username', null))
		} else if (userDataUsermeEmail.email === email) {
			res
				.status(400)
				.json(new ApiResponse('error', 400, null, 'email already exists please user some different email', null))
		}
	} else if (password !== cpassword) {
		res.status(400).json(new ApiResponse('error', 400, null, 'password and confirm password not matched', null))
	} else {
		const userData = await userModel.create({username, email, firstname, lastname, password})
		if (userData) {
			res.status(200).json(new ApiResponse('success', 200, userData, 'user registered successfully', '/login'))
		}
	}
})
export default router
