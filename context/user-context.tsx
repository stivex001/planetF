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
  const { token } = useToken();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        if (!token) {
          setLoading(false);
          return;
        }

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
      } catch (error: unknown) {
        console.log(error, "errr");

        if (error instanceof AxiosError) {
          throw new Error(error?.response?.data?.error?.message);
          setLoading(false);
        } else if (error instanceof Error) {
          throw error;
          setLoading(false);
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
