import { LoginUser, SignupUser } from "@/types/generated";
import axios from "axios";
import routes from "./routes";

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USER_REWARD_API,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

class BaseApis {
  [x: string]: any;
  // Auth

  httpLoginUser = async (data: LoginUser) => {
    try {
      const response = await AxiosInstance.post(
        `https://user-reward-api.onrender.com/api/v1/auth/login`,
        data
      );
      const token = response.data.data.token;
      const user = response.data.data.userData;
      return { user, token }; // Return the response and token
    } catch (error) {
      throw error;
    }
  };

  httpSignupUser = async (data: SignupUser) => {
    try {
      const response = await AxiosInstance.post(routes.SIGNUP, data);
      const token = response.data.token;
      return { response, token }; // Return the response and token
    } catch (error: any) {
      throw error?.response?.data;
    }
  };
}

const http = new BaseApis();

export { http, type BaseApis };
