import {Router} from 'express'
import TagsModel from '../models/tags.models.js'
import ApiResponse from '../utils/ApiResponse.util.js'
import userModel from '../models/users.models.js'
const router = Router()
router.get('/:tagname', async function (req, res) {
	const {tagname} = req.params
	if (tagname) {
		const tagData = await TagsModel.findOne({tagName: tagname}).populate({path: 'posts'})
		if (tagData) {
			res.status(200).json(new ApiResponse('success', 200, tagData, `tag data related to ${tagname}`, null))
		} else {
			res.status(404).json(new ApiResponse('not found', 404, tagData, `tag data related to ${tagname}`, null))
		}
	}
})
// add a router to follow and unfollow a hashtag by the logged in user.
router.post('/:tagname/follow', async function (req, res) {
	const loggedInUser = req.user?.username
	const {tagname} = req.params
	if (loggedInUser && tagname) {
		const userData = await userModel.findOne({username: loggedInUser})
		const tagData = await TagsModel.findOne({tagName: tagname})
		const indexOfUser = tagData?.followers.indexOf(userData?._id)
		const indexOfTag = userData?.followingHashtags.indexOf(tagData?._id)
		if (indexOfUser === -1 && indexOfTag == -1) {
			//follow the hashtag and
			tagData?.followers.push(userData?._id)
			await tagData?.save()
			userData.followingHashtags.push(tagData?._id)
			await userData?.save()
			res.status(200).json(new ApiResponse('success', 200, null, `you followed this tag #${tagname}`, null))
		} else {
			// unfollow the hashtag
			tagData?.followers.splice(indexOfTag, 1)
			await tagData?.save()
			userData.followingHashtags.splice(indexOfUser, 1)
			await userData?.save()
			res.status(200).json(new ApiResponse('success', 200, null, `you unfollowed this tag #${tagname}`, null))
		}
	}
})
// add a router which will check if the the user is following the hashtag or not

router.get('/:tagname/isfollowing', async function (req, res) {
	const {tagname} = req.params
	const loggedInUser = req.user?.username
	if (loggedInUser && tagname) {
		const userData = await userModel.findOne({username: loggedInUser})
		const tagData = await TagsModel.findOne({tagName: tagname})
		const indexOfUser = tagData?.followers.indexOf(userData?._id)
		const indexOfTag = userData?.followingHashtags.indexOf(tagData?._id)
		if (indexOfUser === -1 && indexOfTag == -1) {
			res.status(200).json(new ApiResponse('success', 200, false, `not following #${tagname}`, null))
		} else {
			res.status(200).json(new ApiResponse('success', 200, true, `is following #${tagname}`, null))
		}
	}
})

export default router
