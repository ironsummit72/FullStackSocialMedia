import userModel from "../models/users.models.js";
import ApiResponse from "../utils/ApiResponse.util.js";
import Router from 'express';
const router=Router();


router.get('/user',async(req,res)=>{
    try {
        const {username}=req.query;
        if(username)
     {
      const userData=await userModel.findOne({username}).select(['-password'])
      if(userData)
        {
            res.status(200).json(new ApiResponse('success',200,userData,'userprofile details',null));
        }else{

            res.status(404).json(new ApiResponse('success',404,userData,'userprofile details',null));
        }
     }
        
    } catch (error) {
        console.error(error);
    }

})
router.get('/introdetails', async (req, res) => {
	try {
		const {username} = req.query
		if (username) {
			const userData = await userModel.findOne({username}).select('profession studiedAt wentTo livesIn RelationshipStatus')
			if (userData) {
				res.status(200).json(new ApiResponse('success', 200, userData, 'user intro details', null))
			} else {
				res.status(404).json(new ApiResponse('success', 404, userData, 'userprofile details', null))
			}
		}
	} catch (error) {
		console.error(error)
	}
})
router.get('/followers/:username',async (req,res)=>{
const username=req.params.username;
if(username)
    {
        const userData=await userModel.findOne({username}).populate({path:'followers',select:'-password'})
        if(userData){
            res.status(200).json(new ApiResponse("success",200,userData.followers,`followers of ${username}`,null));
            }else{
            res.status(200).json(new ApiResponse("success",200,userData.followers,`no followers of ${username}`,null));
        }
    }
})
router.get('/following/:username',async (req,res)=>{
const username=req.params.username;
if(username)
    {
        const userData=await userModel.findOne({username}).populate({path:'following',select:'-password'})
        if(userData){
            res.status(200).json(new ApiResponse("success",200,userData.following,`following of ${username}`,null));
            }else{
            res.status(200).json(new ApiResponse("success",200,userData.following,`no following of ${username}`,null));
        }
    }
})


export default router;
