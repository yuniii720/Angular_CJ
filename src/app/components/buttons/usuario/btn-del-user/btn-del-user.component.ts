import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../modals/confirm-dialog/confirm-dialog.component';
import { SupabaseService } from '../../../../services/supabase.service';
import { Usuario } from '../../../../models/usuario.model';
import { log } from 'console';

@Component({
  selector: 'app-btn-del-user',
  templateUrl: './btn-del-user.component.html',
  styleUrls: ['./btn-del-user.component.css']
})
export class BtnDelUserComponent {
  @Input() usuario!: Usuario;  // Asegúrate de pasar el objeto Usuario

  constructor(
    private dialog: MatDialog,
    private supabaseService: SupabaseService
  ) { }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Estás seguro de querer eliminar a ${this.usuario.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUsuario();
      }
    });
  }

  private async deleteUsuario(): Promise<void> {
    const result = await this.supabaseService.deleteUsuario(this.usuario.id!);
    if (result) {
    } else {
      console.log('Error al eliminar el usuario');
    }
  }
}
