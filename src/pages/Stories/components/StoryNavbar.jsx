import DisplayPicture from "@/components/DisplayPicture";
import time_ago from "@/utils/CalculateTimeElasped";
import { Ellipsis, Eye } from "lucide-react";
import { useSelector } from "react-redux";
import StoryViewDrawer from "./StoryViewDrawer";
import StoryDropDown from "./StoryDropDown";

function StoryNavbar({ username, storyData: data }) {
  const loggedInusername = useSelector((state) => state?.userData?.username);
  return loggedInusername !== username ? (
    <div className="absolute w-full h-14 z-10 flex items-center gap-5 bg-black/15">
      <DisplayPicture
        className={`w-10 h-10 rounded-full z-10 ml-2`}
        username={username}
      />
      <div className="storyinfo flex flex-col">
        <h2 className="text-white font-semibold">
          { data?.user?.firstname }{" "}
          { data?.user?.lastname}
        </h2>
        <span className="time text-white font-semibold">
          {time_ago(data?.createdAt)}
        </span>
      </div>
      <div className="menu ml-[50%] text-white">
      </div>
    </div>
  ) : (
    <div className="absolute w-full h-14 z-10 flex items-center gap-5 bg-black/15">
      <DisplayPicture
        className={`w-10 h-10 rounded-full z-10 ml-2`}
        username={username}
      />
      <div className="storyinfo flex flex-col">
        <h2 className="text-white font-semibold">
          { data?.user?.firstname }{" "}
          {data?.user?.lastname }
        </h2>
          <StoryViewDrawer storyId={data?._id}>
        <div className="view flex items-center gap-1 text-white cursor-pointer">
          <Eye />
          <span>{data?.views.length}</span>
        </div>
          </StoryViewDrawer>
      </div>
      <div className="menu ml-[50%] text-white">
        <StoryDropDown storyId={data?._id}>
        <Ellipsis className="cursor-pointer" />
        </StoryDropDown>
      </div>
    </div>
  );
}

export default StoryNavbar;
