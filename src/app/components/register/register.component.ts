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
      const formData = this.registroForm.value;
      // Llamar al método enviarDatos del servicio SupabaseService para enviar el correo electrónico
      this.supabaseService.enviarDatos(formData).then(
        response => {
          console.log('Correo electrónico enviado exitosamente', response);
          // Aquí puedes manejar cualquier lógica adicional después de enviar el correo electrónico
        },
        error => {
          console.error('Error al enviar correo electrónico', error);
          // Aquí puedes manejar el error de manera adecuada
        }
      );
    }
  }

}
