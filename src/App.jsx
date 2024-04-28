import { useEffect } from "react";
import { axiosInstanceWithCredentials } from "./axios/axiosInstance";
import { useDispatch } from "react-redux";
import { authenticateUser, logout } from "./redux/AuthSlice/AuthSlice";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    axiosInstanceWithCredentials
      .get("/getcurrentuser")
      .then((res) => {
        console.log(res.data.data);
        dispatch(authenticateUser(res.data.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(logout());
      });
  }, []);
  return <Outlet/>;
}

export default App;
