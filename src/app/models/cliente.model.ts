export interface Cliente {
  id?: number;
  user_id: string;
  name: string;
  dni: string;
  email: string;
  birth_date: Date | null;
  city: string;
  created_at: Date;
}
