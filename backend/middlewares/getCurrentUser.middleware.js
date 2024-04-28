import jwt from 'jsonwebtoken'
import EnvConf from '../conf/environmentVariables.js'
import ApiResponse from '../utils/ApiResponse.util.js'
const getCurrentUser = (req, res, next) => {
	const token = req.cookies.sessionId
	if (token) {
		jwt.verify(token, EnvConf.JWT_SECRET, (err, decodedToken) => {
			if (err) throw Error(err)
			console.log(decodedToken)
			req.currentUser = decodedToken
			next()
		})
	}
    else{
        res.status(401).json(new ApiResponse('unauthorized',401,null,'user is not logged in','/login'))
    }
}
export default getCurrentUser
