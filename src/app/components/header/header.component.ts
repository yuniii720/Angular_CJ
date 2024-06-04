import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

interface UserRole {
  role_id: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userRoleMessage$: Observable<string> = of('');
  userRoleClass$: Observable<string> = of('');
  userName$: Observable<string | null> = of(null);

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userName$ = this.authService.getUsername();
    this.userRoleMessage$ = this.authService.getUserRole().pipe(
      map((userRole: UserRole | null) => {
        if (!userRole) {
          return '';
        }

        const role_id = userRole.role_id;
        if (role_id === 1) {
          return 'Super Admin';
        } else if (role_id === 2) {
          return 'Bienvenido empleado';
        } else if (role_id === 3) {
          return 'Bienvenido cliente';
        } else {
          return '';
        }
      })
    );

    this.userRoleClass$ = this.authService.getUserRole().pipe(
      map((userRole: UserRole | null) => {
        if (!userRole) {
          return '';
        }

        const role_id = userRole.role_id;
        if (role_id === 1) {
          return 'super-admin';
        } else if (role_id === 2) {
          return 'bienvenido-empleado';
        } else if (role_id === 3) {
          return 'bienvenido-cliente';
        } else {
          return '';
        }
      })
    );

    this.userName$ = this.authService.getUsername();
  }
}
