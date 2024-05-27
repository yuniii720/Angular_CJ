export interface Usuario {
  id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  type: string;
  hire_date: Date | null;
  created_at: Date;
  [key: string]: any;
}
