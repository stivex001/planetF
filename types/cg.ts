export interface CGwallets {
  id?: number;
  name: string;
  balance: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CGWallet {
  id?: number;
  display_name: string;
  value: string;
  network: string
  type: string;
  price: string
  status: number;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface CGbundles {
  id?: number;
  name?: string;
  balance?: string;
  network?: string
  status?: number;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
}
