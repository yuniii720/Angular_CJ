import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';  // Asegúrate de tener la ruta correcta
import { EventService } from '../../../../services/event.service';  // Importa el EventService
import { PopupsComponent } from '../../../popups/popups.component'; // Importa el componente PopupsComponent

@Component({
  selector: 'app-save-users',
  templateUrl: './save-users.component.html',
  styleUrls: ['./save-users.component.css']
})
export class SaveUsersComponent {
  @ViewChild(PopupsComponent) popupsComponent!: PopupsComponent;

  constructor(
    public dialogRef: MatDialogRef<SaveUsersComponent>,
    private supabaseService: SupabaseService,  
    private eventService: EventService  
  ) {}

  async onConfirm(): Promise<void> {
    await this.supabaseService.syncUsuarios();  
    this.dialogRef.close(true);
    if (this.popupsComponent) {
      this.popupsComponent.mostrarPopup(); 
    }
    this.eventService.emitConfirmEvent();  
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
