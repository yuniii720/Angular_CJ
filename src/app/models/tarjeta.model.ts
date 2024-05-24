export interface Tarjeta {
  id: number;
  cardNumber: string;
  cardHolderName: string;
  cardType: string;
  saldo: number;
  expirationDate: string;
  securityCode: string;
}

export interface SaveResult {
  error?: { message: string };
}
