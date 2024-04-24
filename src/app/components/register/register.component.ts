import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-registro',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private supabaseService: SupabaseService) {
    this.registroForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // No es necesario inicializar registroForm aquí si lo haces en el constructor
  }

  registerUser(): void {
    if (this.registroForm.valid) {
      // Aquí puedes agregar la lógica para registrar al usuario
      console.log('Registrando usuario...');
    }
  }

}
