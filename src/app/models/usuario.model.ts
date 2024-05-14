export interface Usuario {
  id: number;
  username: string;
  name: string;
  email: string;
  type: string;
  hire_date: Date | null;
  created_at: Date;
  [key: string]: any;
}
