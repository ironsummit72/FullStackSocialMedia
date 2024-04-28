
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function AuthRouter({ children }) {
  const auth = useSelector((state) => state.isUserAuthenticated);
  return auth ? (
    <div>{children}</div>
  ) : (
    <div>
      please login{" "}
      <Link to="/login" className="text-blue-600">
        login
      </Link>
    </div>
  );
}

export default AuthRouter;
