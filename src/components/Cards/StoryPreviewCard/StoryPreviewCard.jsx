import { Card } from "@/shadcomponents/ui/card";
import DisplayPicture from "@/components/DisplayPicture";
import { useQuery } from "@tanstack/react-query";
import { getStoriesOfUser } from "@/api/QueryFunctions";
import StoryPreviewPhoto from "./StoryPreviewPhoto";
import { Link } from "react-router-dom";
function StoryPreviewCard({ className, username }) {
  const { data } = useQuery({
    queryKey: ["story", username],
    queryFn: ({ queryKey }) => getStoriesOfUser(queryKey[1]),
    enabled: !!username,
  });
  if(data)
  {
    if (data[0]) {
      return (
        <Link to={`stories/${username}`}>
        <Card className={` max-w-40 min-w-40 ${className}`}>
          {/* className=" shadow-xl rounded-md ml-5 transition ease-in-out delay-150  hover:scale-105 cursor-pointer p-0"> */}
          <div className="h-full w-full flex flex-col justify-between">
            <DisplayPicture
              className="w-10 h-10 rounded-full z-10 absolute border-blue-600 border-4"
              username={username}
              />
            <StoryPreviewPhoto
              className={" object-fill"}
              filename={data[data.length-1]?.content?.filename}
              disablelink={true}
              />
            <span className="font-semibold text-sm z-30 text-white">{data[0]?.user.firstname} {data[0]?.user.lastname}</span>
          </div>
        </Card>
      </Link>
    );
  } else {
    <></>;
  }
}
}



export default StoryPreviewCard;
