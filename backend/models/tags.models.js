import mongoose, {Schema} from 'mongoose'
const TagsSchema = new Schema(
	{
		tagName: {
			type: String,
			unique: [true, 'tag name should be unique'],
			required: true,
		},
		posts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'post',
			},
		],
	},
	{timestamps: true},
)
const TagsModel = mongoose.model('Tags', TagsSchema)
export default TagsModel
