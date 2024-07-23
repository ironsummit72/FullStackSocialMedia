import mongoose, {Schema} from 'mongoose'
const StorySchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
		},
		caption: {
			type: String,
			default: '',
		},
		content: {},
		views: [{type: mongoose.Schema.Types.ObjectId, ref: 'user',default:[]}],
	},
	{timestamps: true},
)
StorySchema.index({createdAt: 1}, {expires: '24h'})
const StoryModel = mongoose.model('story', StorySchema)
export default StoryModel
