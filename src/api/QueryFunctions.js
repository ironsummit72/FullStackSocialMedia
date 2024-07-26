import { axiosInstanceWithCredentials } from "@/axios/axiosInstance";

export function searchUserQuery(searchText) {
  console.log("searchText", searchText);
  let fetchData = axiosInstanceWithCredentials
    .get(`/search/users?search=${searchText}`)
    .then((res) => res.data.data);
  return fetchData;
}
export function suggestUser(searchText) {
  console.log("searchText", searchText);
  let fetchData = axiosInstanceWithCredentials
    .get(`/search/mention?search=${searchText}`)
    .then((res) => res.data.data);
  return fetchData;
}
export function getUserDetails(username) {
  console.log("username in QueryFunction", username);
  let fetchData = axiosInstanceWithCredentials
    .get(`/profile/user?username=${username}`)
    .then((res) => res.data.data);
  return fetchData;
}
export function setUserDetails(postData) {
  let postDataResponse = axiosInstanceWithCredentials.post(
    "/set/profileintro",
    postData
  );
  return postDataResponse;
}
export function getUserIntroDetails(username) {
  let fetchData = axiosInstanceWithCredentials
    .get(`/profile/introdetails?username=${username}`)
    .then((res) => res.data.data);
  return fetchData;
}
export function getIsFollowing(username) {
  let fetchData = axiosInstanceWithCredentials.get(
    `/check/isfollowing/${username}`
  );
  return fetchData;
}
export function postFollowUnfollow(username) {
  let fetchData = axiosInstanceWithCredentials.post(
    `/users/${username}/follow`
  );
  return fetchData;
}
export function getPhotosIntroCard(username, limit = 9) {
  let fetchData = axiosInstanceWithCredentials.get(
    `/resource/photos/${username}?limit=${limit}`
  );
  return fetchData;
}
export function getFollowing(username,shuf='true') {
  let fetchData = axiosInstanceWithCredentials.get(
    `/profile/following/${username}?shuf=${shuf}`
  ).then((res)=>res.data.data);
  return fetchData;
}
export function getFollowers(username,shuf='true') {
  let fetchData = axiosInstanceWithCredentials.get(
    `/profile/followers/${username}?shuf=${shuf}`
  ).then((res)=>res.data.data);
  return fetchData;
}
export function getDisplayPicture(username) {
  if (username) {
    let fetchData = axiosInstanceWithCredentials
      .get(`resource/displaypicture/${username}`, { responseType: "blob" })
      .then((res) => res.data);
    return fetchData;
  }
}
export function getCoverPicture(username) {
  if (username) {
    let fetchData = axiosInstanceWithCredentials
      .get(`resource/coverpicture/${username}`, { responseType: "blob" })
      .then((res) => res.data);
    return fetchData;
  }
}
export function getPost(postId) {
  if (postId) {
    let fetchData = axiosInstanceWithCredentials
      .get(`/post/${postId}`)
      .then((res) => res.data.data);
    return fetchData;
  }
}
export function getAllPostFeed(){
  let fetchData=axiosInstanceWithCredentials.get(`/feed/public`).then((res) => res.data.data);
  return fetchData;
}
export function postAddLike(postId)
{
  if(postId) {
    let fetchData = axiosInstanceWithCredentials.post(`/like/${postId}/like`).then((res) => res.data);
    return fetchData;
  }
}
export function getIsPostLiked(postId)
{
  if(postId) {
    let fetchData = axiosInstanceWithCredentials.get(`/like/${postId}/isliked`).then((res)=>res.data.data);
    return fetchData;
  }
}
export function getShowLikes(postId){
  if(postId) {
    let fetchData=axiosInstanceWithCredentials.get(`/like/${postId}/showlikes`).then((res)=>res.data.data.likes);
    return fetchData;
  }
}
export function getHashTags(tagname){
  if(tagname) {
    let fetchData=axiosInstanceWithCredentials.get(`/hashtags/${tagname}`).then((res)=>res.data.data);
    return fetchData;
  }
}
export function postFollowHashTag(tagname)
{
  if(tagname) {
    let fetchData=axiosInstanceWithCredentials.post(`hashtags/${tagname}/follow`).then((res)=>res.data);
    return fetchData;
  }
}
export function getIsFollowingHashTag(tagname)
{
  if(tagname) {
    let fetchData=axiosInstanceWithCredentials.get(`hashtags/${tagname}/isfollowing`).then((res)=>res.data.data);
    return fetchData;
  }
}
export function getStoriesOfUser(username){
  if(username) {
    let fetchData=axiosInstanceWithCredentials.get(`stories/${username}`).then((res)=>res.data.data);
    return fetchData;
  }
}
export function getStoryById(storyId)
{
  if(storyId) {
    let fetchData=axiosInstanceWithCredentials.get(`stories/sid/${storyId}`).then((res)=>res.data.data);
    return fetchData;
  }
}
export function getStoryViews(storyId)
{
  if(storyId) {
    let fetchData=axiosInstanceWithCredentials.get(`stories/showviews/${storyId}`).then((res)=>res.data.data);
    return fetchData;
  }
}
