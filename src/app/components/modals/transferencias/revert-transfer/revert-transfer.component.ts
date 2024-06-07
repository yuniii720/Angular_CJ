import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';
import { Transferencia } from '../../../../models/transferencia.model';
import Swal from 'sweetalert2';  // Importa SweetAlert

@Component({
  selector: 'app-revert-transfer',
  templateUrl: './revert-transfer.component.html',
  styleUrls: ['./revert-transfer.component.css']
})
export class RevertTransferComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RevertTransferComponent>,
    private supabaseService: SupabaseService,
    @Inject(MAT_DIALOG_DATA) public data: Transferencia
  ) {}

  ngOnInit(): void {
    // Inicializar cualquier dato si es necesario
  }

  async revertTransfer(): Promise<void> {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, revertir'
      });

      if (result.isConfirmed) {
        if (this.data.id !== undefined) {
          await this.supabaseService.revertTransfer(this.data.id);
          Swal.fire('Revertida', 'La transferencia ha sido revertida.', 'success');
          this.dialogRef.close(true); // Cerrar el diálogo y pasar true como resultado
        } else {
          throw new Error('ID de la transferencia es undefined');
        }
      }
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al revertir la transferencia.', 'error');
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
