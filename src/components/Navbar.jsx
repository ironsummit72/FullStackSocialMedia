import DisplayPicture from '@/components/DisplayPicture'
import { Link,NavLink } from 'react-router-dom'
import { Input } from '@/shadcomponents/ui/input'
import {Home, Users,Video,Bell,Menu,MessageSquare} from 'lucide-react'
import ProfileDropDown from './Dropdown/ProfileDropDown'
function Navbar() {
  return (
    <header>
      <nav className="nav w-screen h-16 shadow-lg fixed z-20 bg-white">
        <div className="w-[100%] h-full flex items-center gap-10">
          <Link to="/" className="companylogo h-full w-16 ">
            <img className="w-full h-full" src={''} alt="" />
          </Link>
          <Input
            autoComplete={'off'}
            className="w-80 rounded-full bg-gray-100 "
            placeholder="Search Users"
            type="search"
            name="search"
            id=""
          />
          <div className="navlinks h-full w-[40%] flex items-center justify-center gap-16">
            <NavLink to="/" className={`hover:bg-gray-100 p-3`}>
              {({ isActive }) => (
                <Home size={'2.5em'} color={isActive ? '#1937e3' : 'black'} />
              )}
            </NavLink>
            <NavLink to="/people" className={`hover:bg-gray-100 p-3`}>
              {({ isActive}) => (
                <Users size={'2.5em'} color={isActive ? '#1937e3' : 'black'} />
              )}
            </NavLink>
            <NavLink to="/watch" className={`hover:bg-gray-100 p-3`}>
              {({ isActive, }) => (
                <Video size={'2.5em'} color={isActive ? '#1937e3' : 'black'} />
              )}
            </NavLink>
          </div>
          <div className="h-full w-[30%] flex items-center gap-5 ">
            <div className="notification h-10 w-10 bg-slate-300 rounded-full flex justify-center items-center">
              <Menu fill={'true'} size={25} />
            </div>
            <div className="notification h-10 w-10 bg-slate-300 rounded-full flex justify-center items-center">
              <Bell fill={'true'} size={25} />
            </div>
            <div className="notification h-10 w-10 bg-slate-300 rounded-full flex justify-center items-center">
              <MessageSquare fill={'true'} size={25} />
            </div>
            <div className="notification h-10 w-10 bg-slate-300 rounded-full flex justify-center items-center">
             <ProfileDropDown className='w-24 h-24'>
             <DisplayPicture className="w-full h-full rounded-full "/>
             </ProfileDropDown>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar