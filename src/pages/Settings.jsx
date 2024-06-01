import { Outlet } from "react-router-dom";
import SideNav from "./Settings/components/SideNav";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Settings() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/settings/general", { replace: true });
  }, []);
  return (
    <div className="flex gap-4">
      <SideNav />
      <Outlet />
    </div>
  );
}
