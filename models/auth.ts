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
  paywith: yup.string(),
});

export const transferCGBundleSchema = yup.object().shape({
  cgwallet_id: yup.string(),
  user_name: yup.string().required("Username is required"),
  amount: yup.number().required("Amount is required"),
});

export const forgotPasswordSchemaOne = yup.object().shape({
  user_name: yup.string().required("Enter Your Username"),
});

export type SignUpFormValues = yup.InferType<typeof signUpSchema>;

export type CGFormValues = yup.InferType<typeof buyCGBundleSchema>;

export type CGFormTransferValues = yup.InferType<typeof transferCGBundleSchema>;

export type SigninFormValues = yup.InferType<typeof signInSchema>;

export type ForgotPasswordFormOneValues = yup.InferType<
  typeof forgotPasswordSchemaOne
>;

export type AuthFormTypes =
  | SignUpFormValues
  | SigninFormValues
  | CGFormValues
  | CGFormTransferValues
  | ForgotPasswordFormOneValues;

export type AuthFormFields =
  | keyof SignUpFormValues
  | keyof SigninFormValues
  | keyof CGFormValues
  | keyof CGFormTransferValues
  | keyof ForgotPasswordFormOneValues;
