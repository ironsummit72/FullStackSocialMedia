import { getUserDetails } from "@/api/QueryFunctions";
import CoverPicture from "@/components/CoverPicture";
import DisplayPicture from "@/components/DisplayPicture";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, Link, NavLink, Outlet } from "react-router-dom";

function UserProfile() {
  const { username } = useParams();
  const { data } = useQuery({
    queryKey: ["userprofile", username],
    queryFn: ({ queryKey }) => getUserDetails(queryKey[1]),
  });
  return (
    <>
      <div className="w-screen h-screen ">
        <div className="con w-full h-[90%] bg-white shadow-2xl">
          <CoverPicture username={data?.username} />
          <DisplayPicture
            username={data?.username}
            className="w-[15em] h-[15em] rounded-full relative left-[10em] bottom-[2em] border-4 border-white"
          />
          <div className="info relative left-[26em] bottom-[10em] w-fit flex flex-col gap-3 ">
            <div className="headings flex items-center gap-4">
              <h1 className="name text-2xl font-bold">
                {data?.firstname} {data?.lastname}
              </h1>
              <Link to={`../${data?.username}`}>
                <span className="font-semibold text-gray-500">
                  @{data?.username}
                </span>
              </Link>
            </div>
            <div className="followersInfo flex gap-10 w-fit ">
              <Link to={`/${data?.username}/followers`}>Followers</Link>
              <Link to={`/${data?.username}/following`}>Following</Link>
            </div>
          </div>
        </div>
        <nav className="bg-white w-full h-20 flex items-center relative shadow-2xl ">
          <div className="navitems flex gap-x-20 px-72">
            <NavLink   to={`/${data?.username}/`}>
              <span className="font-bold text-gray-600">Posts</span>
            </NavLink>
            <NavLink  className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "decoration-2 underline underline-offset-[70%]" : ""
              } to={`/${data?.username}/about`}>
              <span className="font-bold text-gray-600">About</span>
            </NavLink>
            <NavLink  className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "decoration-2 underline underline-offset-[70%]" : ""
              } to={`/${data?.username}/reels`}>
              <span className="font-bold text-gray-600">Reels</span>
            </NavLink>
            <NavLink  className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "decoration-2 underline underline-offset-[70%]" : ""
              } to={`/${data?.username}/photos`}>
              <span className="font-bold text-gray-600">Photos</span>
            </NavLink>
            <NavLink  className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "decoration-2 underline underline-offset-[70%]" : ""
              } to={`/${data?.username}/videos`}>
              <span className="font-bold text-gray-600">Videos</span>
            </NavLink>
            <NavLink  className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "decoration-2 underline underline-offset-[70%]" : ""
              } to={`/${data?.username}/friends`}>
              <span className="font-bold text-gray-600">Friends</span>
            </NavLink>
           
          </div>
        </nav>
        <Outlet  />
      </div>
    </>
  );
}

export default UserProfile;
