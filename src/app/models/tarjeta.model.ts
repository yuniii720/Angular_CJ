export interface Tarjeta {
  id: string;
  cardNumber: string;
  cardHolderName: string;
  cardType: string;
  saldo: number;
  expirationDate: string;
  securityCode: string;
  PIN: string;
}

export interface SaveResult {
  error?: { message: string };
}
