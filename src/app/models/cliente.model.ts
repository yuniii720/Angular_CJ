export interface Cliente {
  id?: number;
  name: string;
  dni: string;
  email: string;
  birth_date: string; // Asegúrate de que el formato sea compatible con lo que usas en Angular
  city: string;
  created_at: string; // Lo mismo respecto al formato
  // Agrega los campos faltantes como número de cuenta y número de tarjeta si es necesario
}
