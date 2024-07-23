import {Router} from 'express'
import ApiResponse from '../utils/ApiResponse.util.js'
import multerUpload from '../middlewares/multer.middleware.js'
import StoryModel from '../models/stories.models.js'
import userModel from '../models/users.models.js'
// import the stories model here.
const router = Router()

router.get('/:username', async function (req, res) {
	const {username} = req.params
	if (username) {
		// import the stories model and find the stories of specific user
        const userData=await userModel.findOne({username});
        if(userData)
        {
            const storyData=await StoryModel.find({user:userData._id}).populate({path:'user',select:'-password'});
            if(storyData){
                res.status(200).json(new ApiResponse(200,'success',storyData,`stories of ${username}`,null));
            }else{
                res.status(404).json(new ApiResponse(404,'success',storyData,`no stories of ${username}`,null));
            }
        }

	}
})
router.post('/create', multerUpload.single('story'), async function (req, res) {
	const {caption} = req.body
	const loggedInUser = req?.user.username
	if (req.file && loggedInUser) {
		const userData = await userModel.findOne({username: loggedInUser})
		if (userData) {
			const storyResponse = await StoryModel.create({user: userData._id, caption: caption, content: req.file})
			if (storyResponse) {
				res.status(201).json(new ApiResponse('success', 201, storyResponse, 'story added', null))
			} else {
				res.status(500).json(new ApiResponse('error', 500, storyResponse, 'story cannot be added', null))
			}
		}
	}
});


export default router
