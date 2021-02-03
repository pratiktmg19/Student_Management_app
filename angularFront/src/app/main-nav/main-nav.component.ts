import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService} from '../auth.service';
import { Router,ActivatedRoute} from '@angular/router';
import { RoutesService} from '../routes.service';
import { NavbarService} from '../navbar.service';
import { MatSnackBar,  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit{
  user:Object;
  name:any;
  email:any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
 

  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Web)
  //   .pipe(
  //     map(result => result.matches),
  //     shareReplay()
  //   );

  constructor(private router:Router,
    public routes:RoutesService,
    private breakpointObserver: BreakpointObserver,
    private route:ActivatedRoute,
    private service: AuthService, 
    public nav:NavbarService,
    private snackBar:MatSnackBar,
    private auth:AuthService) {
      
    console.log("hey");
    
    }

  ngOnInit(){
    this.user =  this.auth.currentUserValue;
    
    
  }
  logout(){
    this.service.logout();
    this.router.navigate(['/login']);
    this.snackBar.open("You are logged out!" ,'', {duration:3000, horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,});
    this.nav.hide();

  }


}
