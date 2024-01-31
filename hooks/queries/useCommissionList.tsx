
import { getCommissionList } from "@/query/getCommissionList";
import { useToken } from "../auth/useToken";
import { UserTransaction } from "@/types/generated";
import { useQuery } from "@tanstack/react-query";
import { Commissions } from "@/types/transaction";


export const useCommissionList = () => {
  const { token } = useToken();

  return useQuery<unknown, Error, Commissions>({
    enabled: !!token,
    queryFn: () => getCommissionList(),
    queryKey: ["transaction"],
    staleTime: 1000 * 60 * 5,
  });
};
