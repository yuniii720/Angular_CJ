export interface Transferencia {
  id?: number;
  from_account_id: string;
  to_account_id: string;
  amount: number;
  currency: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  from_account?: string;
  to_account?: string;
}
