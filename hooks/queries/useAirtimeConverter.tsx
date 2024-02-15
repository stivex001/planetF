
import { useToken } from "../auth/useToken";
import { useQuery } from "@tanstack/react-query";
import { AirtimeListData } from "@/types/transaction";
import { getAirtimeConverter } from "@/query/getAirtimeConerter";


export const useAirtimeConverter = () => {
  const { token } = useToken();

  return useQuery<unknown, Error, AirtimeListData[]>({
    enabled: !!token,
    queryFn: () => getAirtimeConverter(),
    queryKey: ["airtime"],
    staleTime: 1000 * 60 * 5,
  });
};
