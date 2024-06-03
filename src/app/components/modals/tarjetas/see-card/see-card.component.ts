import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tarjeta } from '../../../../models/tarjeta.model';

@Component({
  selector: 'app-see-card',
  templateUrl: './see-card.component.html',
  styleUrls: ['./see-card.component.scss']
})
export class SeeCardComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { tarjeta: Tarjeta }) {}
}
