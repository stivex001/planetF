"use client";

import { useToken } from "@/hooks/auth/useToken";
import { BASE_URL } from "@/utils/baseUrl";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

interface UserDataProps {
  children: ReactNode;
}

const UserContext = createContext<{ user: any | null; loading: boolean }>({
  user: null,
  loading: false,
});

export const UserProvider = ({ children }: UserDataProps) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const { token } = await useToken();

        const response: AxiosResponse = await axios.get(
          `${BASE_URL}/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data, "redssfwf");

        setUser(response?.data?.data);
        setLoading(false);
      } catch (error: unknown) {
        console.log(error, "errr");

        if (error instanceof AxiosError) {
          setLoading(false);
          throw new Error(error?.response?.data?.error?.message);
        } else if (error instanceof Error) {
          setLoading(false);
          throw error;
        } else throw new Error("Error occurred while logging in");
      }
    };
    if (!user) {
      fetchUserData();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
