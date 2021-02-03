import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { StudentModel } from '../models/student.model';
import { StudentService } from '../student.service'
import { error } from '@angular/compiler/src/util';
import { NavbarService } from '../navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  // user: StudentModel;

  value;

  selectedFile: File = null;

  

  constructor(private fb: FormBuilder,
    private router:Router, private service: StudentService,public nav:NavbarService) { }

  // ngOnInit(): void {
  //   this.studentForm = this.fb.group({
  //     name: [this.user.name, [Validators.required]],
  //     email: [this.user.email, [Validators.required, Validators.email]],
  //     passingYear: [this.user.passingYear, [Validators.required]],
  //     phone: [this.user.phone, [Validators.required]],
  //     rollNo: [this.user.rollNo, [Validators.required]],
  //     department: [this.user.department, [Validators.required]],
  //     address: [this.user.address, [Validators.required]],
      

  //   });
  // }

  studentForm = new FormGroup({
    name:new FormControl(null, Validators.required),
    email:new FormControl(null, Validators.required),
    passingYear:new FormControl(null, Validators.required),
    phone:new FormControl(null, Validators.required),
    rollNo:new FormControl(null, Validators.required),
    department:new FormControl(null, Validators.required),
    address:new FormControl(null, Validators.required),
    image:new FormControl(null, Validators.required),
  });


  ngOnInit(){
    this.nav.show();

  }

  // onFileSelected(event) {
  //   this.selectedFile = <File>event.target.files[0];
  //   this.studentForm.patchValue({ image: this.selectedFile });

  // }



  addStudent() {
    const value = this.studentForm.value;
    const {name, email, phone, passingYear, department,address, rollNo} =  value;

    const student:StudentModel = {
      name, email, phone, passingYear, address, rollNo, department
    }
    this.service.postAddStudent(student,this.studentForm.value.image)
      .subscribe(data => this.router.navigate(['/studentlist']),
      //search how to do refresh after adding student
        
        error => console.log(error));
  }
}



