import EnvConf from '../conf/environmentVariables.js'
import jwt from 'jsonwebtoken'
import ApiResponse from '../utils/ApiResponse.util.js'
const isUserAuthenticated = (req, res, next) => {
	const token = req?.cookies?.sessionId
	if (token) {
		jwt.verify(token, EnvConf.JWT_SECRET, (err, decodedToken) => {
			if (err) {
				console.log(err)
				res.status(401).json(new ApiResponse('unauthorized', 401, null, err.message, '/login'))
			} else {
				console.log(decodedToken)
				next()
			}
		})
	} else {
		res.status(401).json(new ApiResponse('unauthorized', 401, null, 'please login', '/login'))
	}
}
export default isUserAuthenticated
