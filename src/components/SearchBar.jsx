import { Input } from "@/shadcomponents/ui/input";
import { useEffect, useState } from "react";
import DisplayPicture from "./DisplayPicture";
import { Link } from "react-router-dom";
import useDebounce from "@/hooks/useDebouncing";
import { axiosInstanceWithCredentials } from "@/axios/axiosInstance";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const debounce = useDebounce(searchValue, 700);
  const [searchData, setSearchData] = useState([]);
  useEffect(() => {
    axiosInstanceWithCredentials
      .get(`/search/users?search=${debounce}`)
      .then((response) => {
        setSearchData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [debounce]);

  return (
    <div className="">
      <div className="searchContainer mb-2">
        <Input
          className="w-72 relative top-1"
          placeholder="Search Users"
          type="search"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        {searchValue && (
          <div className="suggessioncard bg-white  w-72 min-h-20 max-h-96 shadow-md rounded-b-md overflow-y-auto absolute top-14 ">
            {searchData?.map((data) => {
              return (
                <Link
                  key={data._id}
                  to={`/profile/${data.username}`}
                  className="searchSuggestion flex items-center gap-3 mb-4 mt-4 hover:bg-gray-200/50"
                >
                  <DisplayPicture
                    className={`w-10 h-10 rounded-full ml-5`}
                    username={data.username}
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
