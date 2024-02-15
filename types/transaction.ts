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

export interface ReportData {
  data: number;
  data_amount: number;
  airtime: number;
  airtime_amount: number;
  tv: number;
  tv_amount: number;
  electricity: number;
  electricity_amount: number;
  date: string;
}

export interface BankListData {
  id: number
  name: string
  code: string
}

export interface AirtimeListData {
  id: number
  network: string
  discount: string
  number: string
}