import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcomponents/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcomponents/ui/carousel"

import { Button } from "@/shadcomponents/ui/button"
import DisplayPicture from "../DisplayPicture"
import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query"
import { getIsPostLiked, getPost, postAddLike } from "@/api/QueryFunctions"
import {  Ellipsis, Globe2, Heart, MessageCircle, Share, User, Users } from "lucide-react"
import linkifyText from "../../utils/linkifyText"
import Photo from "../Photo"
import Video from "../Video"
import { useRef } from "react"
import { useToast } from "@/shadcomponents/ui/use-toast"
import ShowLikesDialog from "../Dialogs/ShowLikesDialog"
import PostCardDropdown from "./PostCardDropdown"
import {twMerge} from 'tailwind-merge';
import { Link } from "react-router-dom"

function PostCard({postId,className}) {
  const {toast}=useToast()
  const cardRef=useRef(null);
  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey:['post',postId],
    queryFn:({queryKey})=>getPost(queryKey[1]),
    enabled:!!postId
  });
  const likeMutation=useMutation({
    mutationFn:(postId)=>postAddLike(postId),
    onSuccess:(result)=>{
      toast({
        title:'like info',
        description:result?.message
      })
      queryClient.invalidateQueries({queryKey:['isliked']})
      queryClient.invalidateQueries({queryKey:['showlikes']})
    }
  });
  const isLiked=useQuery({
    queryKey:['isliked',postId],
    queryFn:({queryKey})=>getIsPostLiked(queryKey[1]),
    enabled:!!postId
  })
  const OnHandleLike=()=>{
    likeMutation.mutate(postId);
  }
  const [weekday,month,day,year,time]=new Date(query.data?.createdAt).toString().split(" ")
  const [cweekday,cmonth,cday,cyear,ctime]=new Date(Date.now()).toString().split(" ")
  return (
    <Card className={twMerge(`w-[50%]`,className)} ref={cardRef}>
      <CardHeader className="flex flex-row gap-2 items-center">
        <DisplayPicture showStoryBorder={true}
          className="w-14 h-14 rounded-full"
          username={query.data?.user?.username}/>
        <div>
          <CardTitle className="flex items-center  gap-3 ">
           <Link to={`${query.data?.user?.username}`} className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[75%]"> {query.data?.user?.firstname} {query.data?.user?.lastname}</Link>
         {query.data?.postvisibility==="PUBLIC"?<Globe2 className="text-gray-500"/>:query.data?.postvisibility==="ONLYME"?<User className="text-gray-500"/>:query.data?.postvisibility==="FOLLOWERS"?<Users/>:""}
          </CardTitle>
            <CardDescription>
            {" "}
            {cday === day
              ? time.split(":")[0] + ":" + time.split(":")[1] + " "
              : ""}
            {cmonth === month ? day : month} {cmonth === month ? weekday : day}{" "}
            {cyear === year ? "" : year}
          </CardDescription>
        </div>
        <PostCardDropdown username={query.data?.user?.username} postId={postId} className="float-right relative bottom-3 left-[20rem]">
        <Ellipsis className="float-right relative bottom-3 left-[20em]"/>
        </PostCardDropdown>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 w-full">
        <p className="max-w-[90%]">{linkifyText(query.data?.caption)}</p>
        <Carousel className="w-full flex" >
          <CarouselContent className="">
            {query.data?.media.map((media) => {
              if (media.mimetype.split("/")[0] === "image") {
                return (
                  <CarouselItem key={media.filename}>
                    <Photo
                      className="w-auto h-[90vh]"
                      filename={media.filename}
                      disablelink={true}
                    />
                  </CarouselItem>
                );
              } else if (media.mimetype.split("/")[0] === "video") {
                return (
                  <CarouselItem key={media.filename} className="pl-32">
                    <Video
                      className="w-auto h-[90vh]"
                      filename={media.filename}
                      disablelink={true}
                    />
                  </CarouselItem>
                );
              }
            })}
          </CarouselContent>
          {query.data?.media.length > 1 ? (
            <>
              <CarouselPrevious className="h-10 w-10" />
              <CarouselNext className="h-10 w-10" />
            </>
          ) : (
            <></>
          )}
        </Carousel>
      </CardContent>
      <hr />
      <CardFooter className="flex items-center h-16">
        <div className="w-full h-full flex items-center mt-5  justify-around">
          <div className="flex flex-col items-center">
            <Button id="like" onClick={OnHandleLike}
              className="bg-transparent hover:bg-gray-50 border-none shadow-none"
              size="icon"
            >
              {isLiked.data?.isLiked? <Heart size={30} fill="red" /> :<Heart size={30} color="black" /> }
            </Button>
            <ShowLikesDialog postId={postId}>
            <span className="font-semibold cursor-pointer" >{isLiked.data?.likeCount} likes</span>
            </ShowLikesDialog>
          </div>
          <Button
            className="bg-transparent hover:bg-gray-50 border-none shadow-none"
            size="icon"
          >
            <MessageCircle size={30} color="black" />
          </Button>
          <Button
            className="bg-transparent hover:bg-gray-50 border-none shadow-none"
            size="icon">
            <Share size={30} color="black" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
export default PostCard