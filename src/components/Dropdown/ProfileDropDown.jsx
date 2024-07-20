import { axiosInstanceWithCredentials } from "@/axios/axiosInstance";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcomponents/ui/dropdown-menu";
import { User, Settings, LogOut, Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {Link} from "react-router-dom"

function ProfileDropDown({ children }) {
  const navigate = useNavigate();
  const state=useSelector(state=>state.userData)
  const onLogoutHandler = () => {
    axiosInstanceWithCredentials.delete("/auth/logout").then((response) => {
      toast(response.data.message, { description: `bye see you again, ${state?.username}` });
      setTimeout(() => {
        navigate(response.data.redirectUrl, { replace: true });
      }, 2000);
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <Link to={'/settings'}>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
        <Heart className="mr-2 h-4 w-4" />
          <Link to={'/likedpost'}>Liked Posts</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogoutHandler}>
          <LogOut className="mr-2 h-4 w-4 text-red-500" />
          <span className="text-red-500">Log out</span>
        </DropdownMenuItem>
       
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropDown;
