import {
  getIsFollowing,
  getUserDetails,
  postFollowUnfollow,
  getFollowers,
  getFollowing,
} from "@/api/QueryFunctions";
import CoverPicture from "@/components/CoverPicture";
import DisplayPicture from "@/components/DisplayPicture";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useParams,
  Link,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { Button } from "@/shadcomponents/ui/button";
import { Check, MessageSquare, Pencil, UserPlus } from "lucide-react";
import { useSelector } from "react-redux";
import ProfileHoverCard from "@/components/ProfileHoverCard/ProfileHoverCard";
import { UserProfileSkeleton } from "./Skeletons/UserProfileSkeleton";
function UserProfile() {
  const loggedInuser = useSelector((state) => state.userData?.username);
  const queryClient = useQueryClient();
  const { username } = useParams();
  const navigate = useNavigate();
  const { data, isPending } = useQuery({
    queryKey: ["userprofile", username],
    queryFn: ({ queryKey }) => getUserDetails(queryKey[1]),
    retry: 2,
    throwOnError: () => {
      navigate("/user-not-found");
    },
  });
  const queryUsername = data?.username;
  const { data: isfollowing } = useQuery({
    queryKey: ["isfollowing", username],
    queryFn: ({ queryKey }) => getIsFollowing(queryKey[1]),
    enabled: !!queryUsername,
    refetchOnWindowFocus: true,
  });
  const { data: followers } = useQuery({
    queryKey: ["followers", queryUsername],
    queryFn: ({ queryKey }) => getFollowers(queryKey[1]),
    enabled: !!queryUsername,
  });
  const { data: following } = useQuery({
    queryKey: ["following", queryUsername],
    queryFn: ({ queryKey }) => getFollowing(queryKey[1]),
    enabled: !!queryUsername,
  });
  const mutateFollowUnfollow = useMutation({
    mutationFn: (username) => postFollowUnfollow(username),
    mutationKey: ["followunfollow"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isfollowing"] });
      queryClient.invalidateQueries({ queryKey: ["followers"] });
      queryClient.invalidateQueries({ queryKey: ["following"] });
    },
  });
  const onHandleUnFollow = () => {
    mutateFollowUnfollow.mutate(queryUsername);
  };
  const onHandleFollow = () => {
    mutateFollowUnfollow.mutate(queryUsername);
  };
  if (isPending) {
    return <UserProfileSkeleton />;
  }
  document.title=username
  return (
    <>
      <div className="w-screen h-screen ">
        <div className="con w-full h-[90%] bg-white shadow-2xl">
          <CoverPicture username={data?.username} />
          <DisplayPicture showStoryBorder={true} size={640}
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
              <Link to={`/${data?.username}/friends/followers`}>
                Followers{" "}
                <span className="font-semibold">
                  {followers?.length}
                </span>
              </Link>
              <Link to={`/${data?.username}/friends/following`}>
                Following{" "}
                <span className="font-semibold">
                  {following?.length}
                </span>
              </Link>
            </div>
            <div className="followers-container flex w-[150%] justify-between">
              <div className="flex w-fit min-w-64">
                {followers?.slice(0, 8).map((data) => (
                  <ProfileHoverCard
                    key={data.username}
                    username={`${data.username}`}
                  >
                    <Link to={`/${data?.username}`}>
                      <DisplayPicture
                        className={`w-10 h-10 rounded-full`}
                        username={data.username}
                      />
                    </Link>
                  </ProfileHoverCard>
                ))}
              </div>
              <div className="profilebtn flex gap-10">
                <Button variant="secondary" className={" gap-4  "}>
                  <MessageSquare />
                  Message
                </Button>
                {loggedInuser !== username ? (
                  isfollowing?.data.data == true ? (
                    <Button
                      variant="secondary"
                      onClick={onHandleUnFollow}
                      className="px-10 gap-4"
                    >
                      <Check /> Following
                    </Button>
                  ) : (
                    <Button
                      disabled={mutateFollowUnfollow.isPending}
                      onClick={onHandleFollow}
                      className="px-10 gap-4"
                    >
                      <UserPlus /> Follow
                    </Button>
                  )
                ) : (
                  <Button asChild>
                    <Link className="gap-2" to="/set/dp">
                      <Pencil /> Edit Avatar
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        <nav className="bg-white w-full h-20 flex items-center relative shadow-lg ">
          <div className="navitems flex gap-x-20 px-72">
            <NavLink to={`/${data?.username}/`}>
              <span className="font-bold text-gray-600">Posts</span>
            </NavLink>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "decoration-2 underline underline-offset-[70%]"
                  : ""
              }
              to={`/${data?.username}/about`}
            >
              <span className="font-bold text-gray-600">About</span>
            </NavLink>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "decoration-2 underline underline-offset-[70%]"
                  : ""
              }
              to={`/${data?.username}/reels`}
            >
              <span className="font-bold text-gray-600">Reels</span>
            </NavLink>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "decoration-2 underline underline-offset-[70%]"
                  : ""
              }
              to={`/${data?.username}/photos`}
            >
              <span className="font-bold text-gray-600">Photos</span>
            </NavLink>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "decoration-2 underline underline-offset-[70%]"
                  : ""
              }
              to={`/${data?.username}/videos`}
            >
              <span className="font-bold text-gray-600">Videos</span>
            </NavLink>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "decoration-2 underline underline-offset-[70%]"
                  : ""
              }
              to={`/${data?.username}/friends/followers`}
            >
              <span className="font-bold text-gray-600">Friends</span>
            </NavLink>
          </div>
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export default UserProfile;
