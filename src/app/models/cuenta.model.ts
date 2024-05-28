export interface Cuenta {
  id?: number;
  account_number: string;
  client_id: number;
  clientName?: string; // Añadir este campo para almacenar el nombre del cliente
  balance: number;
  created_at: string;
}
