import { useQuery } from "@tanstack/react-query";
import { suggestUser } from "@/api/QueryFunctions";

export default function useReactQuery(query) {
    return useQuery({queryKey:['suggession',query],queryFn:({queryKey})=> suggestUser(queryKey[1])})
}