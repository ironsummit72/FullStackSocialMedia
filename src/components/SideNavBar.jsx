import { Button } from "@/shadcomponents/ui/button";
import { Link } from "react-router-dom";
import DisplayPicture from "@/components/DisplayPicture";
import { Bookmark, MonitorPlay } from "lucide-react";
import { useSelector } from "react-redux";

function SideNavBar() {
    const state=useSelector(state=>state.userData);
  return (
    <div className="w-96 h-screen  hidden md:block sticky top-0 z-10">
      <ul className= "space-y-10">
      <li className="hover:bg-gray-300 w-[90%] rounded-md p-2 flex items-center">
          <Button asChild variant="ghost" className="w-full">
            <Link
              className="w-full flex gap-5 p-6 text-lg font-semibold hover:bg-gray-300"
              to="/ownprofile">
              <DisplayPicture className={`w-10 h-10 rounded-full`} />
              {state?.fullName}
            </Link>
          </Button>
        </li>
        <li className="hover:bg-gray-300 w-[90%] rounded-md p-2 flex items-center">
          <Button asChild variant="ghost" className="w-full">
            <Link
              className="w-full flex gap-5 p-6 text-lg font-semibold hover:bg-gray-300"
              to="/saved">
               <Bookmark fill='red'/>
              Saved
            </Link>
          </Button>
        </li>
        <li className="hover:bg-gray-300 w-[90%] rounded-md p-2 flex items-center">
          <Button asChild variant="ghost" className="w-full">
            <Link
              className="w-full flex gap-5 p-6 text-lg font-semibold hover:bg-gray-300"
              to="/watch">
               <MonitorPlay color='green'/>
              Video
            </Link>
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default SideNavBar;
