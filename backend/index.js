import express from 'express'
import EnvConf from './conf/environmentVariables.js'
import connectDB from './utils/connectDb.util.js'
import authRouter from './routes/auth.routes.js'
import createRouter from './routes/create.routes.js'
import cookieParser from 'cookie-parser'
import userAuth from './middlewares/isAuthenticated.middleware.js'
import credRouter from './routes/cred.routes.js'
import fs from 'fs'
import cors from 'cors'

const app = express()
const port = EnvConf.APP_PORT

connectDB()
if (!fs.existsSync('uploads')) [fs.mkdirSync('uploads')]
app.use(
	cors({
		origin: EnvConf.ORIGIN_URL,
		credentials: true,
	}),
)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('uploads'))

app.use('/auth', authRouter)
app.use('/create', userAuth, createRouter)

app.use('/getcurrentuser',credRouter)

app.listen(port, () => {
	console.log(`listening on ${port}`)
})
