export interface Transactions {
  id?: number;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
  amount: string;
  i_wallet: string;
  f_wallet: string;
  description: string;
}

export interface Commissions {
  per_page: number;
  data: {
    id?: number;
    type: string;
    created_at: string;
    updated_at: string;
    amount: string;
    balance: string;
    prevBalance: string;
    description: string;
  }[];
}

