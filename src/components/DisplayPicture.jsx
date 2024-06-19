import { axiosInstanceWithCredentials } from "@/axios/axiosInstance";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDisplayPicture } from "@/api/QueryFunctions";
import { useSelector } from "react-redux";

function DisplayPicture({ username, className }) {
  const [displaypicture, setDisplayPicture] = useState("null");
  const loggedInuser=useSelector((state)=>state.userData?.username)
  const { data } = useQuery({ queryKey: ["displaypicture", username? username:loggedInuser],queryFn:({queryKey})=>getDisplayPicture(queryKey[1]),enabled:!!loggedInuser});
  useEffect(()=>{
   if(data)
    {
      setDisplayPicture(URL.createObjectURL(data))
    }
  },[data])
  return (
    <div>
      <img className={className} src={displaypicture} alt="" />
    </div>
  );
}

export default DisplayPicture;
