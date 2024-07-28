import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shadcomponents/ui/tabs";
import LoginWithUsername from "./LoginWithUsername";
import LoginWithEmail from "./LoginWithEmail";

function Login() {
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

export default Login;
