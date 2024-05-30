import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-save-users',
  templateUrl: './save-users.component.html',
  styleUrls: ['./save-users.component.css']
})
export class SaveUsersComponent {

  constructor(
    public dialogRef: MatDialogRef<SaveUsersComponent>,
    private supabaseService: SupabaseService,
    private alertService: AlertService
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
