import axios, { AxiosError } from "axios";
import { useToken } from "@/hooks/auth/useToken";
import { BASE_URL } from "@/utils/baseUrl";
import { CGFormValues } from "@/models/auth";
import { useUser } from "@/context/user-context";

export const buyBundles = async ({ bundle_id, paywith }: CGFormValues) => {
  const { token } = useToken();

  try {
    const response = await axios.post(
      `${BASE_URL}/cg-bundles-buy`,
      {
        bundle_id,
        paywith,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response, "productress");

    if (response?.data?.success === 1) {
      return {
        success: true,
        data: response.data?.data?.user,
        message: response.data?.message,
      };
    } else {
      throw new Error(response?.data?.message);
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Handle AxiosError (e.g., network errors, 4xx, 5xx)
      console.error("Axios error:", error);
      throw new Error(error?.response?.data?.message);
    } else if (error instanceof Error) {
      // Handle other types of errors
      console.error("Generic error:", error);
      throw error;
    } else {
      // Handle unknown errors
      console.error("Unknown error:", error);
      throw new Error("An unknown error occurred.");
    }
  }
};
