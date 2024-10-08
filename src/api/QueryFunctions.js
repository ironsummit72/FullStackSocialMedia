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
export function getDisplayPicture(username,size) {
  if (username&&size) {

    
    let fetchData = axiosInstanceWithCredentials
      .get(`/resource/displaypicture/${username}?size=${size}`, { responseType: "blob" })
      .then((res) => res.data);
    return fetchData;
  }else{
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
export function getAllPostFeed({pageParam}){
  let fetchData=axiosInstanceWithCredentials.get(`/feed/public?page=${pageParam}&limit=5`).then((res) => res.data.data);
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
export function getHashTagsInfiniteScroll(tagname,pageParam,limit){
  if(tagname) {
    let fetchData=axiosInstanceWithCredentials.get(`/hashtags/${tagname}?page=${pageParam}&limit=${limit}`).then((res)=>res.data.data);
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
export function deleteStory(storyId)
{
  if(storyId) {
    let fetchData=axiosInstanceWithCredentials.delete(`/stories/${storyId}`).then((res)=>res.data.data);
    return fetchData;
  }
}
export function getHasStory(username){
  if(username) {
    let fetchData=axiosInstanceWithCredentials.get(`/stories/hasstory/${username}`).then((res)=>res.data.data);
    return fetchData;
  }
}
export function deletePost(postId)
{
  if(postId) {
    let fetchData=axiosInstanceWithCredentials.delete(`/post/${postId}`).then((res)=>res.data);
    return fetchData;
  }
}
export function postSavePost(postId)
{  
  if(postId) {
    let fetchData=axiosInstanceWithCredentials.post(`post/savepost/${postId}`).then((res)=>res.data);
    return fetchData;
  }
}
export function getIsPostSaved(postId){
  if(postId){
    let fetchData=axiosInstanceWithCredentials.get(`/post/ispostsaved/${postId}`).then((res)=>res.data.data);
    return fetchData;
  }
}
export function getUserPostFeed(username,pageParam,limit){
  if(username){
    let fetchData=axiosInstanceWithCredentials.get(`/feed/posts/${username}?page=${pageParam}&limit=${limit}`).then((res)=>res.data.data);
    return fetchData;
  }
}
export function getSavedPostInfiniteScroll(username,pageParam,limit){
  if(username){
    let fetchData=axiosInstanceWithCredentials.get(`/post/savedpost/${username}?page=${pageParam}&limit=${limit}`).then((res)=>res.data.data);
    return fetchData;
  }

}
export function getLikedPostInfiniteScroll(username,pageParam,limit){
  if(username){
    let fetchData=axiosInstanceWithCredentials.get(`/post/likedpost/${username}?page=${pageParam}&limit=${limit}`).then((res)=>res.data.data);
    return fetchData;
  }

}