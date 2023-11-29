import { SignUpFormValues } from "@/models/auth";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const BASE_URL = process.env.NEXT_PUBLIC_PLANETF_API;

export const signUp = async ({
  user_name,
  phoneno,
  email,
  password,
}: SignUpFormValues) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      user_name,
      email,
      password,
      phoneno,
    });

    if (response.status === 200) {
      return {
        success: true,
        data: response.data?.data,
      };
    } else {
      toast.error(response?.data?.message);
      throw new Error(response.data.message);
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.error?.message);
    } else if (error instanceof Error) {
      throw error;
    } else throw new Error("Error occurred while creating account");
  }
};
