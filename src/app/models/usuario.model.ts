export interface Usuario {
  id?: string;
  username: string;
  name: string;
  email: string;
  password: string;
  type: 'Super Admin' | 'Cliente' | 'Empleado';
  hire_date?: Date;
  created_at?: Date;
  [key: string]: any;
}
