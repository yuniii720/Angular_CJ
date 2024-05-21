import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RoleGuardService } from '../../services/role-guard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
