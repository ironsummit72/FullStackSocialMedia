import { axiosInstanceWithCredentials } from "@/axios/axiosInstance";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Photo({ filename, className, postId, disablelink = false }) {
  const [picture, setPicture] = useState(null);
  useEffect(() => {
    if (filename) {
      axiosInstanceWithCredentials
        .get(`files/${filename}`, { responseType: "blob" })
        .then((response) => {
          setPicture(URL.createObjectURL(response.data));
        });
    }
  }, [filename]);
  if (disablelink) {
    return (
      <div>
        <img className={className} src={picture} alt="" />
      </div>
    );
  } else {
    return (
      <Link to={`/show/posts/${postId}`}>
        <div>
          <img className={className} src={picture} alt="" />
        </div>
      </Link>
    );
  }
}
export default Photo;
