import jwt from 'jsonwebtoken'
import EnvConf from '../conf/environmentVariables.js'

export function createToken(payload) {
	if (payload) {
		return jwt.sign(payload, EnvConf.JWT_SECRET)
	}
}
export function verifyToken(token) {
	if (token) {
		return jwt.verify(token, EnvConf.JWT_SECRET)
	}
}
