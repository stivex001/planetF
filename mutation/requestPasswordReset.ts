import { ForgotPasswordFormOneValues } from "@/models/auth";
import { BASE_URL } from "@/utils/baseUrl";
import axios, { AxiosError } from "axios";

export const requestPasswordReset = async ({
  user_name,
}: ForgotPasswordFormOneValues) => {
  try {
    const response = await axios.post(`${BASE_URL}/resetpassword`, {
      user_name,
    });

    if (response?.data?.success === 1) {
      return {
        success: true,
        data: response.data?.data,
        message: response.data?.message,
      };
    } else {
      throw new Error(response.data.message);
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.error?.message);
    } else if (error instanceof Error) {
      throw error;
    } else throw new Error("Error occurred while logging in");
  }
};
