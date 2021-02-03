import * as moment from 'moment';
import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RegisterModel } from './models/register.model';
import { LoginModel } from './models/login.model';
import { tap, shareReplay } from "rxjs/operators";
import { catchError, retry,map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private currentUserSubject: BehaviorSubject<LoginModel>;
  public currentUser:Observable<LoginModel>;
  authToken:any;
  user:any;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<LoginModel>(JSON.parse(localStorage.getItem('currentUser')))
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue():LoginModel {
    return this.currentUserSubject.value;
  }

  //Admin requests
  urlRegister = 'http://localhost:3000/admin/register';
  urlLogin = 'http://localhost:3000/admin/authenticate';

  //Register post api
  postRegister(user: RegisterModel) {
    return this.http.post<any>(this.urlRegister, user)

    // .pipe(catchError(this.errorHandler));
  }


  //Login post api
  postLogin(user: LoginModel) {
    return this.http.post<any>(this.urlLogin, user)
      .pipe(
        tap(user =>{
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;

        })
      );
    // .pipe(catchError(this.errorHandler));
  }

  // public storeUserData(authResult) {
  //   console.log("this is token");
  //   const expiresAt = moment().add(authResult.expiresIn, 'second');
  //   localStorage.setItem('id_token', authResult.token);
  //   localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  //   localStorage.setItem("user", JSON.stringify(authResult.user));
  //   this.authToken = authResult.token;
  //   this.user = authResult.user;

  // }
  // loadToken(){
  //   this.authToken = localStorage.getItem('id_token');
  //   this.user = localStorage.getItem('user');
  // }


  //Handling if there is any error in response
  // errorHandler(error: HttpErrorResponse){
  //   return throwError(error);
  // }
  logout() {

    localStorage.removeItem('currentUser');
  
  }

  // public isLoggedIn() {
  //   return moment().isBefore(this.getExpiration());
  // }

  // isLoggedOut() {
  //   return !this.isLoggedIn();
  // }

  // getExpiration() {
  //   const expiration = localStorage.getItem("expires_at");
  //   const expiresAt = JSON.parse(expiration);
  //   return moment(expiresAt);
  // }

}