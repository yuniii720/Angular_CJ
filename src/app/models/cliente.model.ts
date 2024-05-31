export interface Cliente {
  id?: number;
  user_id: string;
  name: string;
  email: string;
  dni: string;
  birth_date: Date | null;
  city: string;
  created_at: Date;
}
