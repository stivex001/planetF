
import { useToken } from "../auth/useToken";
import { getTransaction } from "@/query/getTransactions";
import { UserTransaction } from "@/types/generated";
import { useQuery } from "@tanstack/react-query";


export const useTransaction = () => {
  const { token } = useToken();

  return useQuery<unknown, Error, UserTransaction>({
    enabled: !!token,
    queryFn: () => getTransaction(),
    queryKey: ["transaction"],
    staleTime: 1000 * 60 * 5,
  });
};
