export interface Tarjeta {
  id?: number;
  saldo: number;
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  securityCode: string;
  cardType: string;
  PIN: string;
  client_id: string; // Cambiado a string si es un UUID
  account_id: number; // Mantener como number si es un entero
}

export interface SaveResult {
  success?: boolean;
  message?: string;
  error?: { message: string };
}

