import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuShortcut
  } from '@/shadcomponents/ui/dropdown-menu';
  import { User, Settings, LogOut } from 'lucide-react';
  import { useNavigate } from 'react-router-dom';


  
  function ProfileDropDown({ children }) {
    const navigate = useNavigate();

    const onLogoutHandler = () => {
      console.log('logout');
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
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onLogoutHandler}>
            <LogOut className="mr-2 h-4 w-4 text-red-500" />
            <span className="text-red-500">Log out</span>
            <DropdownMenuShortcut className="text-red-500">⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  
  export default ProfileDropDown;