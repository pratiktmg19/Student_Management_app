import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../models/login.model';
import { AuthService } from '../auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { NavbarService } from '../navbar.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  user: LoginModel = new LoginModel();

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private service: AuthService,

    private router: Router,
    public nav: NavbarService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.minLength(6)]]
    });
  }

  onLoginSubmit() {
    this.service.postLogin(this.loginForm.value)
      .subscribe(data => {
        if (data.success) {

          this.snackBar.open(`Welcome `, '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.router.navigate(['/dashboard']);

        }
        console.log(data);

      },
        error => {
          console.log(error);

        })
  }

}
