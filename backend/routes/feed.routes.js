import {Router} from 'express'
const router = Router()
import postModel from '../models/post.models.js'
import ApiResponse from '../utils/ApiResponse.util.js'
import mongoose from 'mongoose'

import shuffle from '../utils/Shuffle.js'
import userModel from '../models/users.models.js'
const ObjectId = mongoose.Types.ObjectId;

router.get('/public', async function (req, res) {
try {
  const page=parseInt(req.query.page)||1
  const limit=parseInt(req.query.limit)||10
  const skip=(page-1)*limit
  const postData=await postModel.find({postvisibility: 'PUBLIC'}).skip(skip).limit(limit)
  const postIds=postData.map(data=>data._id)
  const totalItems=await postModel.countDocuments();
  res.status(200).send(new ApiResponse('success',200,{totalPages:Math.ceil(totalItems/limit),currentPage:page,postIds:shuffle(postIds)},'feed Data',null))
} catch (error) {
  console.log(error);
}
})
router.get('/posts/:username',async function (req,res){
const {username}=req.params;
const loggedInUser=req.user.username;
const page=parseInt(req.query.page)||1;
const limit = parseInt(req.query.limit)||10;
const skip=(page-1)*limit;

if(username&&loggedInUser)
{
  if(username===loggedInUser)
  {
    const userData=await userModel.findOne({username});
    const postData=await postModel.find({user:userData?._id}).skip(skip).limit(limit);
    const totalDocument=await postModel.countDocuments();
    res.status(200).json(new ApiResponse('success',200,{totalPages:Math.ceil(totalDocument/limit),currentPage:page,data:postData},'loggedin user feed data',null));  
  }else{
    const userData=await userModel.findOne({username});
    const postData=await postModel.find({$and:[{user:userData?._id},{postvisibility:'PUBLIC'}]}).skip(skip).limit(limit);
    const totalDocument=await postModel.countDocuments();
    res.status(200).json(new ApiResponse('success',200,{totalPages:Math.ceil(totalDocument/limit),currentPage:page,data:postData},'other user feed data',null));  
  }
}
})

router.get('/allpostcurrentuser',async function (req, res) {
    const postData=await postModel.aggregate([{
        $match:
          {
            user: new ObjectId(req.user.id)
          }
      }])
      const postIds=postData.map(data=>data._id)
       res.status(200).send(new ApiResponse('success',200,postIds,'feed Data of Current user',null))
});
export default router
