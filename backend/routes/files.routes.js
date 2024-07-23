import {Router} from 'express'
import fs from 'fs'
import ApiResponse from '../utils/ApiResponse.util.js';
const router=Router();
router.get('/:filename', function (req, res) {
	const {filename} = req.params
	if (filename) {
        const readableStream = fs.createReadStream(`./uploads/posts/${filename}`)
			readableStream.on('data', (chunk) => res.write(chunk))
			readableStream.on('end', () => res.end())
			readableStream.on('error', (err) => res.json(new ApiResponse('error', 400, err.message, 'file not found', null)))
	}
})
router.get('/story/:filename', function (req, res) {
	const {filename} = req.params
	if (filename) {
        const readableStream = fs.createReadStream(`./uploads/story/${filename}`)
			readableStream.on('data', (chunk) => res.write(chunk))
			readableStream.on('end', () => res.end())
			readableStream.on('error', (err) => res.json(new ApiResponse('error', 400, err.message, 'file not found', null)))
	}
})
export default router