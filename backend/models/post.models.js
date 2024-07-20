import {Schema, model} from 'mongoose'
const postSchema = new Schema(
	{
		caption: {
			type: String,
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
		media: {
			type: Array,
			default: [],
		},
		postvisibility: {
			type: String,
			enum:['PUBLIC','ONLYME','FOLLOWERS'],
			default:'PUBLIC'
		},
		likes: [{type: Schema.Types.ObjectId, ref:'user'}],
		hashtags:{
			type:Array,
			default:[],
		}

	},
	{timestamps: true},
)
const postModel = model('post', postSchema)
export default postModel
