import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'
export default function downScaleImages(inputPath, outputPath, width, height) {
	if (!fs.existsSync(`./uploads/displaypicture/${width}`)) {
		fs.mkdir(`./uploads/displaypicture/${width}`, () => {
			console.log(`${outputPath} created`)
		})
	}
	return new Promise((resolve, reject) => {
		ffmpeg(inputPath)
			.size(`${width}x?`)
			.on('end', function () {
				console.log('Image downscale successfull')
				resolve('downscale successfull')
			})
			.on('error', (err) => {
				console.error('Error downscaling image:', err)

				reject(err)
				// Clean up files in case of error
				fs.unlinkSync(inputPath)
			})
			.save(`${outputPath}`)
	})
}
