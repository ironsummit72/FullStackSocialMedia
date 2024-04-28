import multer from 'multer'
import fs from 'fs'
import path from 'path'
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		if (fs.existsSync('uploads')) {
			cb(null, './uploads')
		} else {
			fs.mkdirSync('uploads')
		}
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname))
	},
})

const multerUpload = multer({storage: storage})
export default multerUpload
