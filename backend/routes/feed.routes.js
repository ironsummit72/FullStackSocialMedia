import {Router} from 'express'
const router = Router()
import postModel from '../models/post.models.js'
import ApiResponse from '../utils/ApiResponse.util.js'
import mongoose from 'mongoose'
import shuffle from '../utils/Shuffle.js'
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
