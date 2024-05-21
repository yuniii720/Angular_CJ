import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    const expectedRole = next.data && typeof next.data === 'object' ? next.data['expectedRole'] : null;

    if (expectedRole == null) {
      console.error('Expected role not provided.');
      this.router.navigate(['/not-authorized']);
      return of(false);
    }

    return this.authService.getUserRole().pipe(
      take(1),
      map((userRole: string | null) => {
        if (!userRole || userRole !== expectedRole) {
          console.error('User does not have the expected role.');
          this.router.navigate(['/not-authorized']);
          return false;
        }
        return true;
      }),
      catchError(() => {
        console.error('Error occurred while fetching user role.');
        this.router.navigate(['/not-authorized']);
        return of(false);
      })
    );
  }
}
