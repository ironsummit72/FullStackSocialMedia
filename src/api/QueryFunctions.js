import { axiosInstanceWithCredentials } from "@/axios/axiosInstance"

export function searchUserQuery(searchText)
{
    console.log("searchText",searchText);
    let fetchData= axiosInstanceWithCredentials.get(`/search/users?search=${searchText}`).then((res)=>res.data.data)
    return fetchData
}

export function suggestUser(searchText)
{
    console.log("searchText",searchText);
    let fetchData= axiosInstanceWithCredentials.get(`/search/mention?search=${searchText}`).then((res)=>res.data.data)
    return fetchData
}
export function getUserDetails(username){
    console.log('username in QueryFunction',username);
    let fetchData= axiosInstanceWithCredentials.get(`/profile/user?username=${username}`).then((res)=>res.data.data)
    return fetchData

}

