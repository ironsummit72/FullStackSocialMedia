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
import { RegisterFormSchema } from "@/validation/ZodValidation";
import { Button } from "@/shadcomponents/ui/button";
import { Link } from "react-router-dom";
import { axiosInstanceWithCredentials } from "@/axios/axiosInstance";
import { useToast } from "@/shadcomponents/ui/use-toast";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate=useNavigate();

  const {toast}=useToast()
  const form = useForm({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      cpassword: "",
    },
  });
  const onSubmit = (data) => {
    axiosInstanceWithCredentials.post('auth/register',data).then(response => {
      console.log(response);
      toast({
        title:`${response?.data?.message}`,
        description:`${data.username} your account has been successfully redirecting to Login page`
      })
      setTimeout(() =>{
        navigate('/login',{replace:true});
        
      },2000)
    }).catch((err)=>{
      toast({
          title: `${err?.response?.data.message}`,
          description: "User did not register",
          variant: "destructive",
      })
    })
  };
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Create an account
            </h1>
            <Form {...form}>
              <form
                onSubmit={form?.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your username" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public username.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your email" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your email address
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your firstname" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public Firstname
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your lastname" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public Lastname of your full name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cpassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <Input type='password' placeholder="Confirm Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full" type="submit">
                  Register
                </Button>
                <p className="text-sm font-light text-gray-500">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-blue-600 hover:underline "
                  >
                    Login
                  </Link>
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
