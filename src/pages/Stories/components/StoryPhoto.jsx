import { axiosInstanceWithCredentials } from "@/axios/axiosInstance";
import { useEffect, useState } from "react";
function StoryPhoto({ filename, className,storyId }) {
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
          <img data-storyid={storyId} className={`${className} z-20 h-[90%] rounded-t-md`} src={picture} alt="" />
        </div>  
    )
}
export default StoryPhoto;
