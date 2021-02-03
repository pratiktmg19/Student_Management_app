import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { MatSnackBar ,MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  horizontalPosition:MatSnackBarHorizontalPosition = 'center';
  verticalPosition:MatSnackBarVerticalPosition = 'top'

  constructor(private auth: AuthService, private router: Router, private snackBar:MatSnackBar) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.auth.currentUserValue;
    if (currentUser) {
      //if logged in then return true
      return true; 
    }

    //else redirect to the same page and return false
    this.router.navigate(['/login']);
    this.snackBar.open(`You need to log in!`, '', {
      duration: 4500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    return false;


  }
}
