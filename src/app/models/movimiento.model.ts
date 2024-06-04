export interface Movimiento {
  id: number; // Identificador único del movimiento (autoincremental en Supabase)
  transaction: string; // Descripción de la transacción (ej: "Pago de servicios", "Transferencia recibida")
  amount: number; // Importe del movimiento (positivo para ingresos, negativo para gastos)
  status: string; // Estado del movimiento (ej: "Pendiente", "Confirmado")
  date: Date; // Fecha y hora del movimiento
  channel: string; // Canal de la transacción (ej: "Online", "ATM", "In Store")
  category: string; // Categoría del movimiento (ej: "Comida", "Transporte", "Ocio")
  account_id: number; // ID de la cuenta asociada al movimiento (clave foránea)
  [key: string]: any;  // Índice de firma añadido
}
