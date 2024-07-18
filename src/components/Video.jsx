import { axiosInstanceWithCredentials } from "@/axios/axiosInstance";
import { useEffect, useState, useRef } from "react";
function Video({ filename, className }) {
  const [video, setVideo] = useState(null);
  const videoRef = useRef(null);
  useEffect(() => {
    if (filename) {
      axiosInstanceWithCredentials
        .get(`files/${filename}`, { responseType: "blob" })
        .then((response) => {
          setVideo(URL.createObjectURL(response.data));
        });
    }
  }, [filename]);
  return (
    <div
      onClick={() => {
        console.log("video clicked");
        if (videoRef.current.paused) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      }}
      onMouseOver={() => {
        videoRef.current?.play();
      }}
      onMouseLeave={() => {
        videoRef.current.pause();
      }}
    >
      <video ref={videoRef} className={className} src={video} />
    </div>
  );
}
export default Video;
