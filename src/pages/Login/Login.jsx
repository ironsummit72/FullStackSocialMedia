import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shadcomponents/ui/tabs";
import LoginWithUsername from "./LoginWithUsername";
import LoginWithEmail from "./LoginWithEmail";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Login() {
  const auth = useSelector((state) => state.isUserAuthenticated);
  if(auth)
  {
    return <Navigate to={"/"} replace={true} />;
  }else{
    return (
      <div className="h-screen flex items-center justify-center  ">
      <Tabs defaultValue="username" className="w-[29%] ">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="username">Username</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>
        <TabsContent value="username">
          <LoginWithUsername />
        </TabsContent>
        <TabsContent value="email">
          <LoginWithEmail />
        </TabsContent>
      </Tabs>
    </div>
  );
}
}

export default Login;
