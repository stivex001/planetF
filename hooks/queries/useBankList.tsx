
import { useToken } from "../auth/useToken";
import { useQuery } from "@tanstack/react-query";
import { BankListData } from "@/types/transaction";
import { getBanklist } from "@/query/getBanklist";


export const useBankList = () => {
  const { token } = useToken();

  return useQuery<unknown, Error, BankListData[]>({
    enabled: !!token,
    queryFn: () => getBanklist(),
    queryKey: ["banklist"],
    staleTime: 1000 * 60 * 5,
  });
};
