import { useSelector } from "react-redux";
import {  Navigate, } from "react-router-dom";
function AuthRouter({ children }) {
  const auth = useSelector((state) => state.isUserAuthenticated);
  if (auth) {
    return <div>{children}</div>;
  }
  return <Navigate to={"/login"} replace={true} />;
}

export default AuthRouter;
