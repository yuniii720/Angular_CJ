import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userRole$!: Observable<number | null>; // Marcado con ! para indicar que será inicializado antes de su uso

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole$ = this.authService.getUserRole();
  }
}
