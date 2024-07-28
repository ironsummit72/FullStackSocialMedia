import { z } from "zod";
const LoginFormSchemaEmail = z.object({
  email: z
  .string()
  .min(1, { message: "this field must be field" })
  .email({ message: "this is not a valid email address" }).trim(),
  password: z
    .string()
    .min(5, { message: "password should be at least 5 characters" })
    .max("200", { message: "password must not exceed 200 characters" }).trim(),
});
const LoginFormSchemaUsername = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max("50", { message: "username must not exceed 50 characters" }).trim(),
  password: z
    .string()
    .min(5, { message: "password should be at least 5 characters" })
    .max("200", { message: "password must not exceed 200 characters" }).trim(),
});
const RegisterFormSchema = z
  .object({
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max("50", { message: "username must not exceed 50 characters" }).trim(),
    email: z
      .string()
      .min(1, { message: "this field must be field" })
      .email({ message: "this is not a valid email address" }).trim(),
    firstname: z
      .string()
      .min(1, { message: "this field must be field" })
      .max(100, { message: "this field must not exceed 100 characters" }).trim(),
    lastname: z
      .string()
      .min(1, { message: "this field must be field" })
      .max(100, { message: "this field must not exceed 100 characters" }).trim(),
    password: z
      .string()
      .min(5, { message: "password must be at least 5 characters " })
      .max(200, { message: "password must not exceed 200 characters" }).trim(),
    cpassword: z.string().trim(),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "confirm password not match with password",
    path: ["cpassword"],
  });

export { LoginFormSchemaEmail,LoginFormSchemaUsername, RegisterFormSchema };
