import { Input } from "@/shadcomponents/ui/input";
import { useState } from "react";
import DisplayPicture from "./DisplayPicture";
import { Link } from "react-router-dom";
import useDebounce from "@/hooks/useDebouncing";
import { useQuery } from "@tanstack/react-query";
import { searchUserQuery } from "@/api/QueryFunctions";
import { useRef } from "react";
function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const searchRef=useRef()
  const debounce = useDebounce(searchValue, 700);
  const { data,isSuccess } = useQuery({
    queryKey: ["search", debounce],
    queryFn: ({ queryKey }) => searchUserQuery(queryKey[1]),
    });
  const [showSuggestions,setShowSuggestions] = useState(isSuccess);
  return (
    <div className="">
      <div className="hidden md:block searchContainer mb-2">
        <Input ref={searchRef}
          className="w-72 relative top-1 rounded-full bg-gray-300/50"
          placeholder="Search Users"
          type="search"
          onChange={(e) => {
            setSearchValue(e.target.value);
            if(e.target.value.length > 0) {
              setShowSuggestions(true)
            }else{
              setShowSuggestions(false)
            }
          }}
        />
        {showSuggestions && (
          <div className="suggessioncard bg-white  w-72 min-h-20 max-h-96 shadow-md rounded-b-md overflow-y-auto absolute top-14 ">
            {data?.slice(0,5).map((data) => {
              return (
                <Link
                  key={data._id}
                  to={`/${data.username}`}
                  onClick={()=>{setShowSuggestions(false),searchRef.current.value=""}}
                  className="searchSuggestion flex items-center gap-3 mb-4 mt-4 hover:bg-gray-200/50"
                >
                  <DisplayPicture
                    className={`w-10 h-10 rounded-full ml-5`}
                    username={data.username}
                    showStoryBorder={true}
                  />
                  <span className="font-semibold">{data.fullName}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
