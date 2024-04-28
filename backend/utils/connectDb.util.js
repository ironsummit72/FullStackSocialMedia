import mongoose from 'mongoose'
import EnvConf from '../conf/environmentVariables.js'


export default function connectDB()
{
    mongoose
	.connect(`${EnvConf.DB_URL}${EnvConf.DB_NAME}`)
	.then((res) => {
		console.log('database connected successfully ', res.connection.host)
	})
	.catch((err) => {
		console.log(err)
	})

}