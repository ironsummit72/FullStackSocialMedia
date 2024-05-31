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


export default router;
