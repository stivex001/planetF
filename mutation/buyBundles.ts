
import axios, { AxiosError } from 'axios';
import { useToken } from '@/hooks/auth/useToken';
import { BASE_URL } from '@/utils/baseUrl';
import { CGFormValues } from '@/models/auth';


export const buyBundles = async ({
    bundle_id,
    paywith
}: CGFormValues) => {
  const { token } = useToken();

  try {
    const response = await axios.post(
      `${BASE_URL}/cg-bundles-buy`,
      {
        bundle_id,
        paywith
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response, 'productress');

    if (response?.data?.success === 1) {
      return {
        success: true,
        data: response.data?.data?.user,
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
    } else throw new Error('Error occurred while creating account');
  }
};
 