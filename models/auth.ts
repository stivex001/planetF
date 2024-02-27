import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  user_name: yup.string().required("Username is required"),
  phoneno: yup
    .string()
    .matches(
      /^0[0-9]{10}$/,
      "Phone number must start with 0 and be 11 digits long"
    )
    .required("Phone number is required"),

  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match"),
  referral: yup.string(),
  agreeTerms: yup.boolean().oneOf([true], "You must agree to terms and policy"),
});

export const signInSchema = yup.object().shape({
  user_name: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const buyCGBundleSchema = yup.object().shape({
  bundle_id: yup.string(),
  paywith: yup.string(),
  // receipt: yup.string(),
});

export const transferCGBundleSchema = yup.object().shape({
  cgwallet_id: yup.string(),
  user_name: yup.string().required("Username is required"),
  amount: yup.number().required("Amount is required"),
});

export const forgotPasswordSchemaOne = yup.object().shape({
  user_name: yup.string().required("Select a Provider"),
});

export const reportSchema = yup.object().shape({
  date: yup.string(),
});

export const buyAirtimeSchema = yup.object().shape({
  provider: yup.string(),
  discount: yup.string(),
  amount: yup
    .string()
    .required("Amount is required")
    .test(
      "is-valid-number",
      "Amount must be a valid number",
      (value: string) => {
        if (!isNaN(Number(value))) {
          return true;
        }
        return false;
      }
    ),

  payment: yup.string(),
  promo: yup.string(),
  ref: yup.string(),
  // number: yup
  //   .string()
  //   .required("Phone number is required")
  //   .test("is-valid-phone", "Not a valid phone number", (phone: string) => {
  //     if (!isNaN(Number(phone)) && phone.length >= 10 && phone.length <= 11) {
  //       return true;
  //     }
  //     return false;
  //   }),
  number: yup
    .string()
    .required("Phone numbers are required")
    .test("is-valid-phone", "Not a valid phone numbers", (phones: string) => {
      // Validate each phone number in the string
      const phoneArray = phones.split(",");
      return phoneArray.every((phone) => {
        return (
          !isNaN(Number(phone)) && phone.length >= 10 && phone.length <= 11
        );
      });
    }),
});

export const convertAirtimeSchema = yup.object().shape({
  network: yup.string(),
  discount: yup.number(),
  revNumber: yup.string(),
  code: yup.string(),
  receiver: yup.string(),
  amount: yup
    .string()
    .required("Amount is required")
    .test(
      "is-valid-number",
      "Amount must be a valid number",
      (value: string) => {
        if (!isNaN(Number(value))) {
          return true;
        }
        return false;
      }
    ),

  payment: yup.string(),
  promo: yup.string(),
  ref: yup.string(),
  number: yup
    .string()
    .required("Phone number is required")
    .test("is-valid-phone", "Not a valid phone number", (phone: string) => {
      if (!isNaN(Number(phone)) && phone.length >= 10 && phone.length <= 11) {
        return true;
      }
      return false;
    }),
  accountNumber: yup
    .string()
    .required("account number is required")
    .test("is-valid-phone", "Not a valid phone number", (phone: string) => {
      if (!isNaN(Number(phone)) && phone.length >= 10 && phone.length <= 11) {
        return true;
      }
      return false;
    }),
});

export const buyDataSchema = yup.object().shape({
  coded: yup.string(),
  name: yup.string(),
  amount: yup.string(),
  network: yup.string(),
  payment: yup.string(),
  promo: yup.string(),
  ref: yup.string(),
  number: yup
    .string()
    .required("Phone numbers are required")
    .test("is-valid-phone", "Not a valid phone numbers", (phones: string) => {
      // Validate each phone number in the string
      const phoneArray = phones.split(",");
      return phoneArray.every((phone) => {
        return (
          !isNaN(Number(phone)) && phone.length >= 10 && phone.length <= 11
        );
      });
    }),
});

export const buyBettingSchema = yup.object().shape({
  coded: yup.string(),
  name: yup.string(),
  amount: yup.string(),
  network: yup.string(),
  payment: yup.string(),
  promo: yup.string(),
  ref: yup.string(),
  number: yup
    .string()
    .required("Phone number is required")
    .test("is-valid-phone", "Not a valid phone number", (phone: string) => {
      if (!isNaN(Number(phone)) && phone.length >= 10 && phone.length <= 11) {
        return true;
      }
      return false;
    }),
});

export const buyCheckerSchema = yup.object().shape({
  coded: yup.string(),
  quantity: yup.string(),
  amount: yup.string(),
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
  type: yup.string(),
  price: yup.string(),
  name: yup.string(),
  payment: yup.string(),
  promo: yup.string(),
  ref: yup.string(),
  number: yup
    .string()
    .required("IUC number is required")
    .test("is-valid-phone", "Not a valid IUC number", (phone) => {
      if (Number(phone) && phone.length >= 10 && phone.length <= 11) {
        return true;
      }
      return false;
    }),
});

export const buyElectricitySchema = yup.object().shape({
  provider: yup.string(),
  payment: yup.string(),
  promo: yup.string(),
  ref: yup.string(),
  amount: yup.string().required("Price is required"),
  number: yup.string().required("Meter number is required"),
  // .test("is-valid-phone", "Not a valid phone number", (phone) => {
  //   if (Number(phone) && phone.length >= 10 && phone.length <= 11) {
  //     return true;
  //   }
  //   return false;
  // }),
  phone: yup
    .string()
    .required("Phone number is required")
    .test("is-valid-phone", "Not a valid phone number", (phone) => {
      if (Number(phone) && phone.length >= 10 && phone.length <= 11) {
        return true;
      }
      return false;
    }),
});

export const validateTvSchema = yup.object().shape({
  provider: yup.string(),
  service: yup.string(),
  number: yup
    .string()
    .required("Meter number is required")
    .test("is-valid-phone", "Not a IUC number", (phone) => {
      if (Number(phone) && phone.length >= 10 && phone.length <= 11) {
        return true;
      }
      return false;
    }),
  phone: yup
    .string()
    .required("Phone number is required")
    .test("is-valid-phone", "Not a valid phone number", (phone) => {
      if (Number(phone) && phone.length >= 10 && phone.length <= 11) {
        return true;
      }
      return false;
    }),
});

export type SignUpFormValues = yup.InferType<typeof signUpSchema>;

export type CGFormValues = yup.InferType<typeof buyCGBundleSchema>;

export type CGFormTransferValues = yup.InferType<typeof transferCGBundleSchema>;

export type SigninFormValues = yup.InferType<typeof signInSchema>;

export type ReportFormValues = yup.InferType<typeof reportSchema>;

export type ForgotPasswordFormOneValues = yup.InferType<
  typeof forgotPasswordSchemaOne
>;

export type BuyAirtimeFormValues = yup.InferType<typeof buyAirtimeSchema>;

export type ConvertAirtimeFormValues = yup.InferType<
  typeof convertAirtimeSchema
>;

export type BuyDataFormValues = yup.InferType<typeof buyDataSchema>;
export type BuyBettingFormValues = yup.InferType<typeof buyBettingSchema>;

export type BuyCheckerFormValues = yup.InferType<typeof buyCheckerSchema>;

export type BuyTvFormValues = yup.InferType<typeof buyTvSchema>;

export type ValidateTvFormValues = yup.InferType<typeof validateTvSchema>;

export type BuyElectricityFormValues = yup.InferType<
  typeof buyElectricitySchema
>;

export type AuthFormTypes =
  | SignUpFormValues
  | SigninFormValues
  | CGFormValues
  | CGFormTransferValues
  | ForgotPasswordFormOneValues
  | BuyAirtimeFormValues
  | BuyDataFormValues
  | BuyBettingFormValues
  | BuyTvFormValues
  | BuyElectricityFormValues
  | BuyCheckerFormValues
  | ConvertAirtimeFormValues
  | ReportFormValues
  | ValidateTvFormValues;

export type AuthFormFields =
  | keyof SignUpFormValues
  | keyof SigninFormValues
  | keyof CGFormValues
  | keyof CGFormTransferValues
  | keyof ForgotPasswordFormOneValues
  | keyof BuyAirtimeFormValues
  | keyof BuyDataFormValues
  | keyof BuyBettingFormValues
  | keyof BuyTvFormValues
  | keyof BuyElectricityFormValues
  | keyof BuyCheckerFormValues
  | keyof ValidateTvFormValues
  | keyof ReportFormValues
  | keyof ValidateTvFormValues;
