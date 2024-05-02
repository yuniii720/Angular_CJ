import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';  // Asegúrate de tener la ruta correcta

@Component({
  selector: 'app-save-users',
  templateUrl: './save-users.component.html',
  styleUrls: ['./save-users.component.css']
})
export class SaveUsersComponent {

  constructor(
    public dialogRef: MatDialogRef<SaveUsersComponent>,
    private supabaseService: SupabaseService  // Inyectar el servicio
  ) {}

  async onConfirm(): Promise<void> {
    await this.supabaseService.syncUsuarios();  // Sincronizar los cambios con la base de datos
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
