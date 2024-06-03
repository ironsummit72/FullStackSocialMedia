import Router from 'express'
import userModel from '../models/users.models.js'
import ApiResponse from '../utils/ApiResponse.util.js'

const router = Router()

router.post('/:username/follow', async (req, res) => {
	const {username} = req.params
	const loggedInUser = req?.user?.username
    console.log(`logged in user ${loggedInUser}`,`user to follow ${username}`);

	if (username && loggedInUser) {
		const loggedInUserData = await userModel.findOne({username: req?.user?.username})
		const followUserData = await userModel.findOne({username:req.params.username})
		if(!followUserData?.followers.includes(loggedInUserData?._id) && !loggedInUserData?.following.includes(followUserData?._id)){
        followUserData.followers.push(loggedInUserData?._id)
		await  followUserData.save()
		loggedInUserData.following.push(followUserData?._id)
		await  loggedInUserData.save()
		res.status(200).json(new ApiResponse(200,"success",null,`you followed ${username}`,null));
	}else{
		if(followUserData?.followers.includes(loggedInUserData?._id) && loggedInUserData?.following.includes(followUserData?._id))
			{
				const filteredFollowUserData=followUserData?.followers.filter((userId)=>userId.toString()!==loggedInUserData?._id.toString());
				followUserData.followers=[...filteredFollowUserData]
				await followUserData.save()
				const filteredLoggedInUserData=loggedInUserData?.following.filter((userId)=>userId.toString()!==followUserData?._id.toString());
				loggedInUserData.following=[...filteredLoggedInUserData]
                await loggedInUserData.save()
				res.status(200).json(new ApiResponse(200,"success",null,`you unfollowed ${username}`,null));
			}
	}
	
		
			
	}else{
		console.log("come back to this");
		res.status(400).json(new ApiResponse(400,"failed",null,`something went wrong`,null));
	}
})


export default router
