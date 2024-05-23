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
  userRoleMessage$: Observable<string> = of(''); // Initialize with an empty Observable
 
  constructor(private authService: AuthService) {}
 
  ngOnInit() {
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
  }
}