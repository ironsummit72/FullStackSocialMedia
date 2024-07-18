import {Router} from 'express'
const router = Router()
import postModel from '../models/post.models.js'
import ApiResponse from '../utils/ApiResponse.util.js'
import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId;

router.get('/public', async function (req, res) {
// later will use a recommendation system here based on likes and tags
const postData=await postModel.aggregate([
    {
      $match:
        {
          postvisibility: "PUBLIC"
        }
    }
  ])
  const postIds=postData.map(data=>data._id)
  res.status(200).send(new ApiResponse('success',200,postIds,'feed Data',null))
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
