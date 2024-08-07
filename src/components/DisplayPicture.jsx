import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDisplayPicture, getHasStory } from "@/api/QueryFunctions";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcomponents/ui/dropdown-menu"

function DisplayPicture({ username, className,showStoryBorder,size=320 }) {
  const [displaypicture, setDisplayPicture] = useState("/nodp.svg");
  const {data:hasstorydata}=useQuery({queryKey:['hastory',username],queryFn:({queryKey})=>getHasStory(queryKey[1]),enabled:!!username})
  const loggedInuser=useSelector((state)=>state.userData?.username)
  const { data } = useQuery({ queryKey: ["displaypicture", username? username:loggedInuser,size],queryFn:({queryKey})=>getDisplayPicture(queryKey[1],queryKey[2]),enabled:!!loggedInuser});
  useEffect(()=>{
   if(data?.size>200)
    {
      setDisplayPicture(URL.createObjectURL(data))
    }else{
      setDisplayPicture('/nodp.svg')
    }
  },[data])
  if(loggedInuser!==username)
  {
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
  }else{
    if(hasstorydata)
      {
        return (
          <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
          <img className={`${className} ${hasstorydata===true && showStoryBorder==true?'gradientborder-story':''}`} src={displaypicture} alt="" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem><Link to={`/set/dp`}>Edit Avatar</Link></DropdownMenuItem>
            <DropdownMenuItem><Link to={`/stories/${username}`}>View Story</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        );
      }else{
        return (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <img
                  className={`${className} ${
                    hasstorydata === true && showStoryBorder == true
                      ? "gradientborder-story"
                      : ""
                  }`}
                  src={displaypicture}
                  alt=""
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to={`/set/dp`}>Edit Avatar</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      }
  }
}

export default DisplayPicture;
