import { Input } from "@/shadcomponents/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcomponents/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormSchemaEmail } from "@/validation/ZodValidation";
import { Button } from "@/shadcomponents/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/shadcomponents/ui/use-toast";
import { axiosInstanceWithCredentials } from "@/axios/axiosInstance";

function LoginWithUsername() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(LoginFormSchemaEmail),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    axiosInstanceWithCredentials
      .post("auth/login", data)
      .then((response) => {
        console.log(response.data);
        toast({
          varient: "success",
          title: `Welcome back ${response.data.data}`,
          description: `${response?.data?.message} Redirecting to Home page`,
        });
        setTimeout(() => {
          navigate(response?.data?.redirectUrl);
        }, 2000);
      })
      .catch((err) => {
        toast({
          title: `${err?.response?.data.message}`,
          description: "Login Failed",
          variant: "destructive",
        });
      });
  };
  return (

      <div className="flex flex-col items-center justify-center px-1 py-1 mx-auto lg:py-0 w-full">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign with Email
            </h1>
            <Form {...form}>
              <form
                onSubmit={form?.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form?.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your email" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is email address
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form?.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter Your password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="w-full" type="submit">
                  Login
                </Button>
                <p className="text-sm font-light text-gray-500">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-blue-600 hover:underline "
                  >
                    Register
                  </Link>
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>

  );
}

export default LoginWithUsername;
