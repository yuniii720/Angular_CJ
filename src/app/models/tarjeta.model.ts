export interface Tarjeta {
  cardNumber: string;
  saldo: number;
  cardHolderName: string;
  expirationDate: string;
  securityCode: string;
  cardType: string;
}

export interface SaveResult {
  error?: { message: string };
}
