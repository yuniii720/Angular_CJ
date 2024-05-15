import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';  // Asegúrate de tener la ruta correcta
import { AlertService } from '../../../../services/alert.service';  // Importar el servicio de alerta

@Component({
  selector: 'app-save-users',
  templateUrl: './save-users.component.html',
  styleUrls: ['./save-users.component.css']
})
export class SaveUsersComponent {

  constructor(
    public dialogRef: MatDialogRef<SaveUsersComponent>,
    private supabaseService: SupabaseService,  // Inyectar el servicio
    private alertService: AlertService  // Inyectar el servicio de alerta
  ) {}

  async onConfirm(): Promise<void> {
    try {
      await this.supabaseService.syncUsuarios();  // Sincronizar los cambios con la base de datos
      this.alertService.success('Cambios guardados.');  // Mostrar una alerta de éxito
      this.dialogRef.close(true);
    } catch (error) {
      console.error('Error al guardar los cambios', error);
      this.alertService.error('Error al guardar los cambios. Intente de nuevo.');  // Mostrar una alerta de error
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
