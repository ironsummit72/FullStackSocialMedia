import { axiosInstanceWithCredentials } from "@/axios/axiosInstance"

export function searchUserQuery(searchText)
{
    console.log("searchText",searchText);
    let fetchData= axiosInstanceWithCredentials.get(`/search/users?search=${searchText}`).then((res)=>res.data.data)
    console.log(fetchData,"fetchData");
    return fetchData
}

export function suggestUser(searchText)
{
    console.log("searchText",searchText);
    let fetchData= axiosInstanceWithCredentials.get(`/search/mention?search=${searchText}`).then((res)=>res.data.data)
    return fetchData
}

