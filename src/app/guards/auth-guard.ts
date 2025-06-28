import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '@app/services/auth-service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();
  console.log(`AuthGuard: isAuthenticated: ${isAuthenticated}`);

  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/login']).then(r => {});
    return false;
  }
};

