import { createClient } from '@supabase/supabase-js';

class LoginService {
  private supabase: any;

  constructor() {
    this.supabase = createClient('https://pbjdatvfbfkhaqrxrzdg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiamRhdHZmYmZraGFxcnhyemRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MzA0OTUsImV4cCI6MjAyOTAwNjQ5NX0.c-OqL72CZnVcBSMMRitbiN5VUzZF6SDrRuwLHA-i7jk');
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    try {

      const { data: { user }, error }: { data: { user: any }, error: any } = await this.supabase
        .auth
        .signIn({ email, password });

      if (error) {
        throw error;
      }


      return user;
    } catch (error: any) {

      console.error('Error al iniciar sesión:', error.message);
      throw error;
    }
  }
}

export default new LoginService();
