import { SigninFormValues } from "@/models/auth";
import axios, { AxiosError, AxiosResponse } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_PLANETF_API;

interface ApiResponseType {
  message: string | undefined;
  success: number | undefined;
  data: any;
}

export const signinWithEmail = async ({
  user_name,
  password,
}: SigninFormValues) => {
  try {
    const response: AxiosResponse<ApiResponseType> = await axios.post(
      `${BASE_URL}/login`,
      {
        user_name,
        password,
      }
    );

    if (response?.data?.success === 1) {
      return { success: true, data: response?.data };
    } else {
      throw new Error(response?.data?.message);
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.error?.message);
    } else if (error instanceof Error) {
      throw error;
    } else throw new Error("Error occurred while logging in");
  }
};
