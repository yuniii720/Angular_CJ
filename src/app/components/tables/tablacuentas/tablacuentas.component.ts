import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';
import { Cuenta } from '../../../models/cuenta.model';

@Component({
  selector: 'app-tablacuentas',
  templateUrl: './tablacuentas.component.html',
  styleUrls: ['./tablacuentas.component.css']  // Corrige el nombre de la propiedad de 'styleUrl' a 'styleUrls'
})
export class TablaCuentasComponent implements OnInit {

  cuentas: Cuenta[] = [];

  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
    this.supabaseService.cuentas$.subscribe(cuentas => {
      this.cuentas = cuentas;
    });
  }
}
