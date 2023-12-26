import { useToken } from "@/hooks/auth/useToken";
import {
  ValidateTvFormValues,
} from "@/models/auth";
import { BASE_URL } from "@/utils/baseUrl";
import axios, { AxiosError, AxiosResponse } from "axios";

interface ApiResponseType {
  token: string;
  message: string | undefined;
  success: number | undefined;
  data: any;
}

export const validateTv = async ({
  provider,
  number,
}: ValidateTvFormValues) => {
  const { token } = useToken();
  try {
    const response: AxiosResponse<ApiResponseType> = await axios.post(
      `${BASE_URL}/validate`,
      {
        service: "tv",
        provider,
        number,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data, "ressssss");

    if (response?.data?.success === 1) {
      return {
        success: true,
        data: response?.data,
      };
    } else {
      throw new Error(response?.data?.message);
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.error?.message);
    } else if (error instanceof Error) {
      throw error;
    } else throw new Error("Error occurred while creating account");
  }
};
