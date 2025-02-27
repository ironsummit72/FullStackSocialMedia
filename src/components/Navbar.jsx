import DisplayPicture from '@/components/DisplayPicture'
import { Link,NavLink } from 'react-router-dom'
import {Home, Users,Video,Bell,Menu,MessageSquare} from 'lucide-react'
import ProfileDropDown from './Dropdown/ProfileDropDown'
import Logo from './Logo'
import SearchBar from './SearchBar'
function Navbar() {
  return (
    <header className="sticky top-0 z-20">
      <nav className="nav w-screen h-16 shadow-lg   bg-white">
        <div className="w-[100%] h-full flex items-center gap-10">
          <Link to="/" className="companylogo h-full w-16 ">
          <Logo className=""/>
          </Link>
          <SearchBar />
          <div className=" navlinks h-full w-[40%] flex items-center justify-center gap-16">
            <NavLink to="/" className={`hover:bg-gray-100 p-3 hidden lg:block`}>
              {({ isActive }) => (
                <Home size={'2.5em'} color={isActive ? '#1937e3' : 'black'} />
              )}
            </NavLink>
            <NavLink to="/people" className={`hover:bg-gray-100 p-3 hidden lg:block`}>
              {({ isActive}) => (
                <Users size={'2.5em'} color={isActive ? '#1937e3' : 'black'} />
              )}
            </NavLink>
            <NavLink to="/watch" className={`hover:bg-gray-100 p-3 hidden lg:block`}>
              {({ isActive, }) => (
                <Video size={'2.5em'} color={isActive ? '#1937e3' : 'black'} />
              )}
            </NavLink>
          </div>
          <div className="h-full w-[30%] flex items-center gap-5 ">
            <div className="hidden md:flex notification h-10 w-10 bg-slate-300 rounded-full flex justify-center items-center">
              <Menu fill={'true'} size={25} />
            </div>
            <div className="hidden md:flex notification h-10 w-10 bg-slate-300 rounded-full flex justify-center items-center">
              <Bell fill={'true'} size={25} />
            </div>
            <div className="hidden md:flex notification h-10 w-10 bg-slate-300 rounded-full flex justify-center items-center">
              <MessageSquare fill={'true'} size={25} />
            </div>
            <div className="notification h-10 w-10 md:h-14 md:w-14 bg-slate-300 rounded-full flex justify-center items-center">
             <ProfileDropDown className='w-24 h-24'>
             <DisplayPicture className="h-10 w-10 md:w-14 md:h-14 rounded-full " size={240}/>
             </ProfileDropDown>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar