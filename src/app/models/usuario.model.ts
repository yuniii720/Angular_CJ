export interface Usuario {
  id: number;
  username: string;
  name: string;
  email: string;
  type: string;
  created_at: Date;
  [key: string]: any;
}
