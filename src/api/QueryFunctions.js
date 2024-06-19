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
export function getPhotosIntroCard(username,limit=9) {
  let fetchData = axiosInstanceWithCredentials.get(
    `/resource/photos/${username}?limit=${limit}`
  );
  return fetchData;
}
export function getFollowing(username) {
  let fetchData = axiosInstanceWithCredentials.get(
    `/profile/following/${username}`
  );
  return fetchData;
}
export function getFollowers(username) {
  let fetchData = axiosInstanceWithCredentials.get(
    `/profile/followers/${username}`
  );
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
