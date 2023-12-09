import { useToken } from "@/hooks/auth/useToken";
import { BASE_URL } from "@/utils/baseUrl";
import axios, { AxiosError } from "axios";

export const getVirtualacount = async () => {
  const { token } = useToken();

  try {
    const response = await axios.get(`${BASE_URL}/vaccounts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response?.data?.success === 1) {
      return response?.data;
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