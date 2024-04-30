import dotenv from 'dotenv/config'
const EnvConf = {
	DB_URL: process.env.DB_URL,
	APP_PORT: process.env.APP_PORT,
	JWT_SECRET: process.env.JWT_SECRET,
	DB_NAME: process.env.DB_NAME,
	ORIGIN_URL: process.env.ORIGIN_URL
}
export default EnvConf
