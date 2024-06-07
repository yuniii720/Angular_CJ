import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  cards = [
    { balance: '$147,000.00', type: 'VISA', number: '**** **** **** 4782', holder: 'Jamshidbek Tashpulatov', expires: '01/21' },
    { balance: '$147,000.00', type: 'VISA', number: '**** **** **** 4782', holder: 'Jamshidbek Tashpulatov', expires: '01/21' },
    { balance: '$147,000.00', type: 'VISA', number: '**** **** **** 4782', holder: 'Jamshidbek Tashpulatov', expires: '01/21' },
    { balance: '$147,000.00', type: 'VISA', number: '**** **** **** 4782', holder: 'Jamshidbek Tashpulatov', expires: '01/21' }
    // Add more cards as needed
  ];
}
