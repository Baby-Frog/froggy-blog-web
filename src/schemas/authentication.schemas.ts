import * as yup from "yup";
export const authenticationSchema = yup.object({
  email: yup
    .string()
    .email("Your e-mail address is invalid, please try another one")
    .required("E-mail address is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(160, "Password must be at most 160 characters long"),
  rePassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Password and confirm password is mismatched"),
});

export const registerSchema = authenticationSchema.pick(["email", "password", "rePassword"]);
export const loginSchema = authenticationSchema.pick(["email", "password"]);

export type TLoginSchema = yup.InferType<typeof loginSchema>;
export type TRegisterSchema = yup.InferType<typeof registerSchema>;
