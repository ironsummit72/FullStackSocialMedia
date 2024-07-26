import { axiosInstanceWithCredentials } from "@/axios/axiosInstance";
import { useEffect, useState, useRef } from "react";
function StoryPreviewVideo({ filename, className }) {
  const [video, setVideo] = useState(null);
  const videoRef = useRef(null);
  useEffect(() => {
    if (filename) {
      axiosInstanceWithCredentials
        .get(`files/story/${filename}`, { responseType: "blob" })
        .then((response) => {
          setVideo(URL.createObjectURL(response.data));
        });
    }
  }, [filename]);
  useEffect(() => {
    const loopVideo = () => {
      videoRef.current?.play(); 
      setTimeout(() => {
        videoRef.current?.pause(); 
        loopVideo(); 
      }, 5000);
    };
    loopVideo(); 

    return () => {
      clearTimeout(loopVideo);
    };
  }, []);
  return (
    <div>
      <video ref={videoRef} className={className} src={video} muted  />
    </div>
  );
}
export default StoryPreviewVideo;
