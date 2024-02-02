import { useToken } from "@/hooks/auth/useToken";
import { ReportFormValues } from "@/models/auth";
import { BASE_URL } from "@/utils/baseUrl";
import axios, { AxiosError, AxiosResponse } from "axios";

interface ApiResponseType {
  token: string;
  message: string | undefined;
  success: number | undefined;
  data: any;
}

export const fetchDailyReprt = async ({ date }: ReportFormValues) => {
  const { token } = useToken();
  try {
    const formData = new FormData();
    if (typeof date === 'string') {
      formData.append("date", date);
    } else {
      throw new Error('Invalid date format'); 
    }

    const response: AxiosResponse<ApiResponseType> = await axios.post(
      `${BASE_URL}/report_daily`,
      formData,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log(response, "ressssss");

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
