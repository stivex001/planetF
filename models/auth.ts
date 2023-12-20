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
  user_name: yup.string().required("Select a Provider"),
});

export const buyAirtimeSchema = yup.object().shape({
  provider: yup.string().required("Select a Provider"),
  amount: yup.string().required("Price is required"),
  country: yup.string().required("Country is required"),
  payment: yup.string(),
  promo: yup.string(),
  ref: yup.string(),
  number: yup
    .string()
    .required("Phone number is required")
    .test("is-valid-phone", "Not a valid phone number", (phone) => {
      if (Number(phone) && phone.length >= 10 && phone.length <= 11) {
        return true;
      }
      return false;
    }),
});

export const buyDataSchema = yup.object().shape({
  coded: yup.string(),
  country: yup.string().required("Country is required"),
  payment: yup.string(),
  promo: yup.string(),
  ref: yup.string(),
  number: yup
    .string()
    .required("Phone number is required")
    .test("is-valid-phone", "Not a valid phone number", (phone) => {
      if (Number(phone) && phone.length >= 10 && phone.length <= 11) {
        return true;
      }
      return false;
    }),
});

export const buyTvSchema = yup.object().shape({
  coded: yup.string(),
  payment: yup.string(),
  promo: yup.string(),
  ref: yup.string(),
  number: yup
    .string()
    .required("Phone number is required")
    // .test("is-valid-phone", "Not a valid phone number", (phone) => {
    //   if (Number(phone) && phone.length >= 10 && phone.length <= 11) {
    //     return true;
    //   }
    //   return false;
    // }),
});

export type SignUpFormValues = yup.InferType<typeof signUpSchema>;

export type CGFormValues = yup.InferType<typeof buyCGBundleSchema>;

export type CGFormTransferValues = yup.InferType<typeof transferCGBundleSchema>;

export type SigninFormValues = yup.InferType<typeof signInSchema>;

export type ForgotPasswordFormOneValues = yup.InferType<
  typeof forgotPasswordSchemaOne
>;

export type BuyAirtimeFormValues = yup.InferType<
  typeof buyAirtimeSchema
>;

export type BuyDataFormValues = yup.InferType<
  typeof buyDataSchema
>;

export type BuyTvFormValues = yup.InferType<
  typeof buyTvSchema
>;

export type AuthFormTypes =
  | SignUpFormValues
  | SigninFormValues
  | CGFormValues
  | CGFormTransferValues
  | ForgotPasswordFormOneValues
  | BuyAirtimeFormValues
  | BuyDataFormValues
  | BuyTvFormValues

export type AuthFormFields =
  | keyof SignUpFormValues
  | keyof SigninFormValues
  | keyof CGFormValues
  | keyof CGFormTransferValues
  | keyof ForgotPasswordFormOneValues
  | keyof BuyAirtimeFormValues
  | keyof BuyDataFormValues
  | keyof BuyTvFormValues
