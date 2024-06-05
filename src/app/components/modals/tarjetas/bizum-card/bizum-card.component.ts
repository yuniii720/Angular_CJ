import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SupabaseService, SaveResult } from '../../../../services/supabase.service'; // Asegúrate de importar SaveResult desde supabase.service
import { AlertService } from '../../../../services/alert.service';
import { Cuenta } from '../../../../models/cuenta.model';

@Component({
  selector: 'app-bizum-card',
  templateUrl: './bizum-card.component.html',
  styleUrls: ['./bizum-card.component.css']
})
export class BizumCardComponent implements OnInit {

  cuentas: Cuenta[] = [];

  bizumForm: FormGroup = new FormGroup({});

  constructor(
    private supabaseService: SupabaseService,
    private alertService: AlertService,
    private dialogRef: MatDialogRef<BizumCardComponent>
  ) { }

  ngOnInit(): void {
    this.bizumForm = new FormGroup({
      cuentaOrigen: new FormControl('', [Validators.required]),
      importe: new FormControl('', [Validators.required, Validators.min(1)]),
      motivo: new FormControl('', [Validators.required]),
      destinatario: new FormControl('', [Validators.required]),
    });

    this.supabaseService.obtenerCuentas().then((cuentas: Cuenta[]) => {
      this.cuentas = cuentas;
    });
  }

  enviarBizum() {
    if (this.bizumForm.valid) {
      const datosBizum = this.bizumForm.value;
      this.supabaseService.enviarBizum(datosBizum).then((result: SaveResult) => {
        if (result.success) {
          this.alertService.success('Bizum enviado correctamente');
          this.dialogRef.close();
        } else {
          this.alertService.error(result.message || 'Error desconocido');
        }
      }).catch(() => {
        this.alertService.error('Error al enviar Bizum');
      })
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}
