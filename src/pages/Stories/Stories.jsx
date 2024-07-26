import { useParams } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcomponents/ui/carousel";
import {useState,useEffect} from 'react'
import { useQuery } from "@tanstack/react-query";
import { getStoriesOfUser } from "@/api/QueryFunctions";
import StoryItem from "./components/StoryItem";
import { axiosInstanceWithCredentials } from "@/axios/axiosInstance";

function Stories() {
  const { username} = useParams();
  const { data } = useQuery({
    queryKey: ["story", username],
    queryFn: ({ queryKey }) => getStoriesOfUser(queryKey[1]),
    enabled: !!username,
  });

 
  const [api,setApi]=useState();
  useEffect(()=>{
    if(!api) {
      return 
    }
    api.on('slidesInView',()=>{
     addViews(api.slideNodes()[api.slidesInView()[0]].children[0].children[1].children[0].dataset.storyid);
        if(api.slideNodes()[api.slidesInView()[0]].children[0].children[1].children[0].nodeName==='VIDEO'){
          api.slideNodes()[api.slidesInView()[0]].children[0].children[1].children[0].play();
        }
        api.slidesNotInView().forEach((element)=>{
          if(api.slideNodes()[element].children[0].children[1].children[0].nodeName==='VIDEO'){
            api.slideNodes()[element].children[0].children[1].children[0].pause();
          }
        })
    })
  },[api])
   function addViews(storyId){
    if(storyId)
    {
      axiosInstanceWithCredentials.post(`stories/addviews/${storyId}`)
    }
  }
  return (
    <div className="w-full h-screen bg-black flex items-center justify-center relative">
      <Carousel setApi={setApi}
        className="w-1/3 h-screen">
        <CarouselContent className=" h-screen ">
          {data?.map((storydata) => {
              return (
                  <CarouselItem key={storydata._id}>
                   <StoryItem storyId={storydata._id}/>
                  </CarouselItem>
              );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
export default Stories;
