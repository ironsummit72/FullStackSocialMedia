import express from 'express'
import morgan from 'morgan'
import EnvConf from './conf/environmentVariables.js'
import connectDB from './utils/connectDb.util.js'
import authRouter from './routes/auth.routes.js'
import createRouter from './routes/create.routes.js'
import cookieParser from 'cookie-parser'
import userAuth from './middlewares/isAuthenticated.middleware.js'
import credRouter from './routes/cred.routes.js'
import setRouter from './routes/set.routes.js'
import resourceRouter from './routes/resources.routes.js'
import checkRouter from './routes/check.routes.js'
import searchRouter from './routes/search.routes.js'
import profileRouter from './routes/profile.routes.js'
import usersRouter from './routes/users.routes.js'
import fileRouter from './routes/files.routes.js'
import postRouter from './routes/post.routes.js'
import feedRouter from './routes/feed.routes.js'
import likeRouter from './routes/like.routes.js'
import hashtagsRouter from './routes/hashtags.routes.js'
import storiesRouter from './routes/stories.routes.js'
import cors from 'cors'
import getCurrentUser from './middlewares/getCurrentUser.middleware.js'
const app = express()
const port = EnvConf.APP_PORT

connectDB()
app.use(morgan('tiny'))
app.use(
	cors({
		origin: EnvConf.ORIGIN_URL,
		credentials: true,
	}),
)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/auth', authRouter)
app.use(getCurrentUser)
app.use(express.static('uploads'))
app.use('/create', userAuth, createRouter)
app.use('/set', userAuth, setRouter)
app.use('/post', postRouter)
app.use('/resource', resourceRouter)
app.use('/check', checkRouter)
app.use('/search', searchRouter)
app.use('/profile', profileRouter)
app.use('/users', usersRouter)
app.use('/feed', feedRouter)
app.use('/files', fileRouter)
app.use('/like', likeRouter)
app.use('/hashtags', hashtagsRouter)
app.use('/stories', storiesRouter);
app.use('/getcurrentuser', credRouter)

app.listen(port, () => {
	console.log(`listening on ${port}`)
})
