import { useQuery } from "@tanstack/react-query";
import { useToken } from "./useToken";
import { getUser } from "@/query/getUser";
import { UserProfile } from "@/types/auth";

export const useUser = () => {
  const { token } = useToken();

  return useQuery<UserProfile, Error, UserProfile>({
    enabled: !!token,
    queryFn: () => getUser(),
    queryKey: ["currentUser"],
    staleTime: 0,
  });
};
