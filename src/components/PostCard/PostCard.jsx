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
import { useQuery } from "@tanstack/react-query"
import { getPost } from "@/api/QueryFunctions"
import { Heart, MessageCircle, Share } from "lucide-react"
import linkifyText from "../../utils/linkifyText"
import Photo from "../Photo"
import Video from "../Video"
import { useRef } from "react"
function PostCard({postId}) {
  const cardRef=useRef(null);
  console.log(cardRef.current?.getBoundingClientRect().top);
  const query = useQuery({
    queryKey:['post',postId],
    queryFn:({queryKey})=>getPost(queryKey[1]),
    enabled:!!postId
  });
  const [weekday,month,day,year,time]=new Date(query.data?.createdAt).toString().split(" ")
  const [cweekday,cmonth,cday,cyear,ctime]=new Date(Date.now()).toString().split(" ")
  return (
    <Card className="w-[70%]" ref={cardRef}>
      <CardHeader className="flex flex-row gap-2 items-center">
        <DisplayPicture
          className="w-14 h-14 rounded-full"
          username={query.data?.user?.username}
        />
        <div>
          <CardTitle>
            {query.data?.user?.firstname} {query.data?.user?.lastname}
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
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p>{linkifyText(query.data?.caption)}</p>
        <Carousel>
          <CarouselContent className="-ml-2">
            {query.data?.media.map((media) => {
              if (media.mimetype.split("/")[0] === "image") {
                return (
                  <CarouselItem key={media.filename} className="pl-32">
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
      <CardFooter className="flex items-center ">
        <div className="w-full h-full flex items-center mt-5  justify-around">
          <Button
            className="bg-transparent hover:bg-gray-50 border-none shadow-none"
            size="icon"
          >
            <Heart size={30} color="black" />
          </Button>
          <Button
            className="bg-transparent hover:bg-gray-50 border-none shadow-none"
            size="icon"
          >
            <MessageCircle size={30} color="black" />
          </Button>
          <Button
            className="bg-transparent hover:bg-gray-50 border-none shadow-none"
            size="icon"
          >
            <Share size={30} color="black" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
export default PostCard