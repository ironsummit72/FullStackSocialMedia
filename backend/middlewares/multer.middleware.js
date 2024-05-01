import multer from 'multer'
import fs from 'fs'
import path from 'path'
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		if (fs.existsSync('uploads')) {
			if (fs.existsSync(`./uploads/${file.fieldname}`)) {
				cb(null, `./uploads/${file.fieldname}`)
			} else {
				fs.mkdirSync(`./uploads/${file.fieldname}`)
				cb(null, `./uploads/${file.fieldname}`)
			}
		} else {
			fs.mkdirSync('uploads')
			if (fs.existsSync(`./uploads/${file.fieldname}`)) {
				cb(null, `./uploads/${file.fieldname}`)
			} else {
				fs.mkdirSync(`./uploads/${file.fieldname}`)
				cb(null, `./uploads/${file.fieldname}`)
			}
		}
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
	},
})

const multerUpload = multer({storage: storage})
export default multerUpload
