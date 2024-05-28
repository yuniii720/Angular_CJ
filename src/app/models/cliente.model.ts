export interface Cliente {
  id: number;
  name: string;
  dni: string;
  email: string;
  city: string;
  birth_date: Date;
  created_at?: Date;
}
