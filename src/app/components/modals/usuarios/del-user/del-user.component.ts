import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../confirm-dialog/confirm-dialog.component';
import { SupabaseService } from '../../../../services/supabase.service';
import { Usuario } from '../../../../models/usuario.model';

@Component({
  selector: 'app-del-user',
  templateUrl: './del-user.component.html',
  styleUrl: './del-user.component.css'
})
export class DelUserComponent {
  @Input() usuario!: Usuario;

  constructor(
    public dialog: MatDialog,
    private supabaseService: SupabaseService
  ) { }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Estás seguro de querer eliminar a ${this.usuario.username}?`
      } as ConfirmDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteUsuario();
      }
    });
  }

  deleteUsuario(): void {
    if (this.usuario.id) {
      this.supabaseService.deleteUsuario(this.usuario.id);
      console.log('Usuario marcado para eliminación');
    }
  }
}
