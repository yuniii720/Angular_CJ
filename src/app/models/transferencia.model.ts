export interface Transferencia {
  id?: number;
  from_account: string;
  to_account: string;
  amount: number;
  currency: string;
  status: string;
  description?: string;
  transfer_date?: string;
  created_at?: string;
  updated_at?: string;
}
