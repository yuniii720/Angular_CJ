export interface Tarjeta {
  id?: number;
  saldo: number;
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  securityCode: string;
  cardType: string;
  PIN: string;
  client_id: number;
  account_id: number;
}

export interface SaveResult {
  error?: { message: string };
}
