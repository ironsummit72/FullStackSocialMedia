import DisplayPicture from "./DisplayPicture";
import { Plus } from "lucide-react";
import { Button } from "@/shadcomponents/ui/button";
import { Link } from "react-router-dom";
function CreateStoryCard() {
  return (
    <div className="max-w-40 min-w-40 h-72 bg-gray-100 shadow-xl rounded-md ml-5 transition ease-in-out delay-150  hover:scale-105 cursor-pointer ">
      <DisplayPicture className={"rounded-t-md"} />
      <Button
        aschild
        className="rounded-full h-14 w-14 relative left-12 bottom-7 border-4 border-white">
        <Link to="/createstory">
          <Plus />
        </Link>
      </Button>
      <span className="font-bold relative top-10 right-12">Create Story</span>
    </div>
  );
}
export default CreateStoryCard;
