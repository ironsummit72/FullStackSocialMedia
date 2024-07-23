import { axiosInstanceWithCredentials } from "@/axios/axiosInstance";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function StoryPreviewPhoto({ filename, className, postId, disablelink = true }) {
  const [picture, setPicture] = useState(null);
  useEffect(() => {
    if (filename) {
      axiosInstanceWithCredentials
        .get(`files/story/${filename}`, { responseType: "blob" })
        .then((response) => {
          setPicture(URL.createObjectURL(response.data));
        });
    }
  }, [filename]);
    return (
        <div className="h-72" >
          <img className={`${className} z-20 h-[90%] rounded-t-md`} src={picture} alt="" />
          <img className={` blur-xl h-full rounded-md`} src={picture} alt="" />
        </div>  
    )
}
export default StoryPreviewPhoto;
