import {Schema, model} from 'mongoose'
import {generateHash} from '../utils/hashGen.utils.js'
const userSchema = new Schema(
	{
		username: {
			type: String,
			require: true,
			unique: true,
		},
		email: {type: String, unique: true, require: true},
		firstname: {type: String, require: true},
		lastname: {type: String, require: true},
		password: {type: String, require: true},
		displaypicture: {
			type: String,
			default: null,
		},
		coverpicture: {
			type: String,
			default: null,
		},
		posts: {
			type: Schema.Types.ObjectId,
			ref: 'post',
		},
		taggedposts: [{type: Schema.Types.ObjectId, ref: 'post'}],
		followers: [{type: Schema.Types.ObjectId, ref: 'user'}],
		following: [{type: Schema.Types.ObjectId, ref: 'user'}],
		profession: {type: String, default: ''},
		studiedAt: {type: String, default: ''},
		wentTo: {type: String, default: ''},
		livesIn: {type: String, default: ''},
		RelationshipStatus: {type: String, enum: ['SINGLE', 'INRELATIONSHIP', 'MARRIED'], default: 'SINGLE'},
		likedPosts: {
			type: [{type: Schema.Types.ObjectId, ref: 'post'}],
			default: [],
		},
		followingHashtags: [{type: Schema.Types.ObjectId, ref: 'Tags'}],
		savedPosts:[{type: Schema.Types.ObjectId, ref: 'post'}]
	},
	{timestamps: true},
)
userSchema.pre('save', function (next) {
	try {
		if (!this.isModified('password')) {
			return next()
		} else {
			const {hash, salt} = generateHash(this.password)
			this.password = `${hash}.${salt}`
			next()
		}
	} catch (error) {
		return next(error)
	}
})
const userModel = model('user', userSchema)
export default userModel
