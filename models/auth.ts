import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  user_name: yup.string().required("Username is required"),
  phoneno: yup.string().required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match"),
  referral: yup.string(),
});

export const signInSchema = yup.object().shape({
  user_name: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const buyCGBundleSchema = yup.object().shape({
  bundle_id: yup.string(),
  paywith: yup.string()
});

export type SignUpFormValues = yup.InferType<typeof signUpSchema>;

export type CGFormValues = yup.InferType<typeof buyCGBundleSchema>;

export type SigninFormValues = yup.InferType<typeof signInSchema>;

export type AuthFormTypes = SignUpFormValues | SigninFormValues | CGFormValues;

export type AuthFormFields =
  | keyof SignUpFormValues
  | keyof SigninFormValues
  | keyof CGFormValues;
