import { axiosInstanceWithCredentials } from "@/axios/axiosInstance";
import { useEffect, useState } from "react";

function DisplayPicture({ username, className }) {
  const [displaypicture, setDisplayPicture] = useState("null");

  useEffect(() => {
    if (username) {
      axiosInstanceWithCredentials
        .get(`resource/displaypicture/${username}`, { responseType: "blob" })
        .then((response) => {
          setDisplayPicture(URL.createObjectURL(response.data));
        });
    } else {
      axiosInstanceWithCredentials
        .get(`resource/displaypicture`, { responseType: "blob" })
        .then((response) => {
          setDisplayPicture(URL.createObjectURL(response.data));
        });
    }
  }, [username]);
  return (
    <div>
      <img className={className} src={displaypicture} alt="" />
    </div>
  );
}

export default DisplayPicture;
