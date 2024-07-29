import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDisplayPicture, getHasStory } from "@/api/QueryFunctions";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function DisplayPicture({ username, className,showStoryBorder, }) {
  const [displaypicture, setDisplayPicture] = useState("null");
  const {data:hasstorydata}=useQuery({queryKey:['hastory',username],queryFn:({queryKey})=>getHasStory(queryKey[1]),enabled:!!username})
  const loggedInuser=useSelector((state)=>state.userData?.username)
  const { data } = useQuery({ queryKey: ["displaypicture", username? username:loggedInuser],queryFn:({queryKey})=>getDisplayPicture(queryKey[1]),enabled:!!loggedInuser});

  useEffect(()=>{
   if(data)
    {
      setDisplayPicture(URL.createObjectURL(data))
    }
  },[data])


  if(hasstorydata)
  {
    return (
      <Link to={`/stories/${username}`} >
        <img className={`${className} ${hasstorydata===true && showStoryBorder==true?'gradientborder-story':''}`} src={displaypicture} alt="" />
      </Link>
    );
  }else{
    return (
      <div >
        <img className={`${className} ${hasstorydata===true && showStoryBorder==true?'gradientborder-story':''}`} src={displaypicture} alt="" />
      </div>
    );
  }

}

export default DisplayPicture;
