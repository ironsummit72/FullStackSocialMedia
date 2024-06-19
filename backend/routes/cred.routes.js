import Router from 'express'
import jwt from 'jsonwebtoken'
import EnvConf from '../conf/environmentVariables.js'
import ApiResponse from '../utils/ApiResponse.util.js'

const router = Router()
router.get('/', (req, res) => {
	const token = req.cookies.sessionId
	if (token) {
		jwt.verify(token, EnvConf.JWT_SECRET, (err, decodedToken) => {
			res.json(new ApiResponse('success', 200, decodedToken, 'current user', '/'))
		})
	} else {
		res.status(401).json(new ApiResponse('error', '401', null, 'unauthorize access', '/login'))
	}
})
export default router
