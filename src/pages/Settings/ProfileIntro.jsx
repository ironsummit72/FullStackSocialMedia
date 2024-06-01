import { Button } from "@/shadcomponents/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcomponents/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shadcomponents/ui/form";
import { Input } from "@/shadcomponents/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcomponents/ui/select";
import { useForm, Controller } from "react-hook-form";
import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import { getUserIntroDetails, setUserDetails } from "@/api/QueryFunctions";
import { useToast } from "@/shadcomponents/ui/use-toast";
import { useSelector } from "react-redux";
export default function Component() {
  const { toast } = useToast();
  const auth = useSelector((state) => state.userData);
  const queryClient = useQueryClient()
  const { data  } = useQuery({
    queryKey: ["userintrodetails", auth?.username],
    queryFn: ({ queryKey }) => getUserIntroDetails(queryKey[1]),
  });
  const form = useForm({
    defaultValues:{
        profession:data?.profession,
        livesin:data?.livesIn,
        wentto:data?.wentTo,
        studiedat:data?.studiedAt,
        relationshipstatus:data?.RelationshipStatus
    }
  });
  const mutation = useMutation({
    mutationFn:setUserDetails,onSuccess:(data)=>{
      toast({
        varient: "success",
        title: `Updated Successfully `,
        description: `${data?.data?.message} `,
      });
      queryClient.invalidateQueries({ queryKey: ['userintrodetails'] })
    }
  })
  function submitHandler(data) {
    mutation.mutate(data);
  }
  return (
    <Card className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem>
                <CardHeader>
                  <CardTitle>Profession</CardTitle>
                  <CardDescription>
                    Enter your job title or current occupation.
                  </CardDescription>
                </CardHeader>
                <FormControl>
                  <CardContent>
                    <Input placeholder="Profession" {...field} />
                  </CardContent>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="studiedat"
            render={({ field }) => (
              <FormItem>
                <CardHeader>
                  <CardTitle>Studied at</CardTitle>
                  <CardDescription>
                    Enter the name of your school or university.
                  </CardDescription>
                </CardHeader>
                <FormControl>
                  <CardContent>
                    <Input placeholder="Studied at" {...field} />
                  </CardContent>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="wentto"
            render={({ field }) => (
              <FormItem>
                <CardHeader>
                  <CardTitle>Went to</CardTitle>
                  <CardDescription>
                    Enter the name of your high school.
                  </CardDescription>
                </CardHeader>
                <FormControl>
                  <CardContent>
                    <Input placeholder="Went to" {...field} />
                  </CardContent>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="livesin"
            render={({ field }) => (
              <FormItem>
                <CardHeader>
                  <CardTitle>Lives In</CardTitle>
                  <CardDescription>
                    Enter the city or town where you currently reside.
                  </CardDescription>
                </CardHeader>
                <FormControl>
                  <CardContent>
                    <Input placeholder="Lives In" {...field} />
                  </CardContent>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <CardHeader>
            <CardTitle>Relationship Status</CardTitle>
            <CardDescription>
              Enter your current relationship (e.g., single, married,
              inRelationship)
            </CardDescription>
          </CardHeader>
          <Controller
            control={form.control}
            name="relationshipstatus"
            defaultValue={`SINGLE`}
            render={({ field: { onChange, value, name } }) => (
              <CardContent className="">
                <Select onValueChange={onChange} value={value} name={name}>
                  <SelectTrigger className="w-[200px] border-2 border-black relative bg-gray-50">
                    <SelectValue placeholder="Relationship status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Relationship Status</SelectLabel>
                      <SelectItem value="SINGLE">
                        <div className="flex items-center gap-2">
                          <span>Single</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="INRELATIONSHIP">
                        <div className="flex items-center gap-2">
                          <span>In Relationship</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="MARRIED">
                        <div className="flex items-center gap-2">
                          <span>Married</span>
                        </div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </CardContent>
            )}
          />
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit">Save</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
