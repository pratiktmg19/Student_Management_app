import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { RegisterModel} from './models/register.model';
import { LoginModel} from './models/login.model';
import { StudentModel} from './models/student.model';
import { catchError, retry} from 'rxjs/operators';
import { throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  sharedData :string;
  
  //Admin requests
  // urlRegister = 'http://localhost:3000/admin/register';
  // urlLogin = 'http://localhost:3000/admin/authenticate';
  
  //students requests
  
  urlAddStudent = "http://localhost:3000/student/addStudent";
  urlUpdateStudent = "http://localhost:3000/student/update";
  urlDeleteStudent = "http://localhost:3000/student/delete";
  urlGetById = "http://localhost:3000/student/student";
  urlCount = "http://localhost:3000/student";


  //Register post api
  // postRegister(user:RegisterModel){
  //   return this.http.post<any>(this.urlRegister,user)
  //     .pipe(catchError(this.errorHandler));
  // }
 
  //Login post api
  // postLogin(user:LoginModel){
  //   return this.http.post<any>(this.urlLogin,user)
  //     .pipe(catchError(this.errorHandler));
  // }

  postAddStudent(user:StudentModel,image:File){
   
    // console.log(user, "This is user");
    
    const postData = new FormData();

    Object.keys(user).forEach((key) => {
       postData.append(key, user[key]);
     });
    //  postData.append('image', user.image)
    postData.append("image",image );
    console.log(postData);
    return this.http.post<any>(this.urlAddStudent, postData)
       .pipe(catchError(this.errorHandler));
  }

  updateStudent(user:StudentModel,image:File, id){
    const postData = new FormData();

    Object.keys(user).forEach((key) => {
       postData.append(key, user[key]);
     });
    //  postData.append('image', user.image)
    postData.append("image",image );
    return this.http.put<any>(this.urlUpdateStudent + '/'  + id, postData)
      .pipe(catchError(this.errorHandler));
  }
 
  deleteStudent(id){
    return this.http.delete<any>(this.urlDeleteStudent + '/' + id)
    .pipe(catchError(this.errorHandler));
  }

  getStudentById(id){
    return this.http.get<any>(this.urlGetById + '/' + id)
    .pipe(catchError(this.errorHandler));
  }

    //get students list
  //retry will retry http request 3 times if failed
  getStudentList(){
    return this.http.get<any>('http://localhost:3000/student/studentlist')
    .pipe(catchError(this.errorHandler));
  }

  

  //Handling if there is any error in response
  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }


  
}
