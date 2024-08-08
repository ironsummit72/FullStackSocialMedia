import multer from 'multer'
import fs from 'fs'
import path from 'path'
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		if(file.fieldname!=='story')
		{

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
		}else{
			if(file.fieldname==='story'&&file.mimetype.split('/')[0]==='video')
				{
				cb(null, `./uploads/story/unprocessedvideo`)
				//console.log("yes this is a story and video");
				if(!fs.existsSync('./uploads/story/unprocessedvideo'))
					{
						fs.mkdir('./uploads/story/unprocessedvideo',()=>{
							console.log("created unprocessedvideo dir");
					})
				}
				
			}else{
				cb(null, `./uploads/${file.fieldname}`)
			}
		}
		
	},
	filename: function (req, file, cb) {
		if (file.fieldname === 'coverpicture') {
			const uniqueSuffix = req.user.username
			cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
		} else if (file.fieldname === 'displaypicture') {
			const uniqueSuffix = req.user.username
			cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
		}else{
			const uniqueSuffix = Date.now()+'_'+req.user.username
			cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
		}
	},
})

const multerUpload = multer({storage: storage})
export default multerUpload
