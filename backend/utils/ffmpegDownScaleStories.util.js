import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
const cropVideo = (inputPath, outputPath) => {
   
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(inputPath, (err, metadata) => {
        if (err) {
          reject('Error retrieving metadata:', err);
          return;
        }
  
        const width = metadata.streams[0].width;
        const height = metadata.streams[0].height;
  
        // Calculate crop values for 16:9 to 9:16 conversion
        const cropWidth = Math.min(width, height * 9 / 16);
        const cropHeight = Math.min(height, width * 16 / 9);
        const x = (width - cropWidth) / 2;
        const y = (height - cropHeight) / 2;
        let totalTime;
        ffmpeg(inputPath).setStartTime('00:00:00').setDuration('00:00:30')
          .videoFilters([
            {
              filter: 'crop',
              options: {
                out_w: cropWidth,
                out_h: cropHeight,
                x: x,
                y: y
              }
            }
          ]).on('codecData',(data)=>{
            totalTime = parseInt(data.duration.replace(/:/g, '')) 

          }).on('progress',(progress)=>{
            console.log("processing...",progress.timemark);
            const time = parseInt(progress.timemark.replace(/:/g, ''))

            // AND HERE IS THE CALCULATION
            const percent = (time / totalTime) * 100
                
            console.log(percent)
          })
          .on('end', () => {
            console.log('Video cropped successfully');
            fs.unlink(inputPath,()=>{
                console.log("deleted unprocessed video");
            })
            resolve();
          })
          .on('error', (err) => {
            console.error('Error cropping video:', err);
            reject(err);
          })
          .save(outputPath);
      });
    });
  };
  export default cropVideo