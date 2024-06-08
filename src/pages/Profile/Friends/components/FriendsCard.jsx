import SearchBar from '@/pages/Profile/Friends/components/SearchBar'
import {NavLink,Outlet} from 'react-router-dom';
function FriendsCard() {
  return (
    <div className="w-[70%] h-fit py-8 rounded-lg shadow-2xl  flex items-center  flex-col gap-y-8 px-8">
        <div className="w-[90%] header flex items-center justify-between  mt-5">
            <h1 className="heading font-bold text-lg">Friends</h1>
            <SearchBar/>
        </div>
        <div className="containers w-[90%] flex gap-10">
        <NavLink to={`../friends/followers`} className={`hover:bg-gray-100 `}>
              {({ isActive }) => (
        <h1 className={isActive?'decoration-2 underline underline-offset-[80%] font-semibold':'font-semibold'}>Followers</h1>
              )}
            </NavLink>
        <NavLink to={`../friends/following`} className={`hover:bg-gray-100 `}>
              {({ isActive }) => (
        <h1 className={isActive?'decoration-2 underline underline-offset-[80%] font-semibold':'font-semibold'}>Following</h1>
              )}
            </NavLink>
        </div>
       <Outlet/>
    </div>
  )
}

export default FriendsCard