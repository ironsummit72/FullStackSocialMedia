import { axiosInstanceWithCredentials } from "@/axios/axiosInstance";
import { useEffect, useState, useRef } from "react";
function StoryVideo({ filename, className ,storyId}) {
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
  return (
    <div
      onClick={() => {
        if (videoRef.current.paused) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      }}
      onMouseOver={() => {
        videoRef.current?.play();
      }}
    >
      <video data-storyid={storyId} ref={videoRef} className={className} src={video} />
    </div>
  );
}
export default StoryVideo;
