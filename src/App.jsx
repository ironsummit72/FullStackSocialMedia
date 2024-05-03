import { useEffect } from "react";
import { axiosInstanceWithCredentials } from "./axios/axiosInstance";
import { useDispatch } from "react-redux";
import { authenticateUser, logout } from "./redux/AuthSlice/AuthSlice";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    axiosInstanceWithCredentials
      .get("/getcurrentuser")
      .then((res) => {
        console.log(res.data.data);
        const dataUser = res.data.data;
        if (dataUser) {
          dispatch(authenticateUser(dataUser));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(logout());
      });
  }, []);
  return (
  <div className="flex-col">
  <Navbar/>
  <Outlet />
  </div>
    
  );
}

export default App;
