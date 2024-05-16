export interface Tarjeta {
  id?: number;
  cardNumber: string;
  saldo: number;
  cardHolderName: string;
  expirationDate: string;
  securityCode: string;
  cardType: string;
  PIN: string;
}

export interface SaveResult {
  error?: { message: string };
}
