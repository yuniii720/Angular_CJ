export interface Movimiento {
  id: number;
  account_id: number;
  transaction: string;
  amount: number;
  date: Date;
  channel: string;
  category: string;
  status: 'Processing' | 'Success';
  account?: {
    account_number: string;
  };
  [key: string]: any;  // Índice de firma añadido
}
