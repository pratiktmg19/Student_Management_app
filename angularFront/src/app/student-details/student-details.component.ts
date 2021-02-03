import { Component, OnInit, Inject } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { StudentModel } from '../models/student.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NavbarService } from '../navbar.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  id;

  studentDetail;
  mySubscription:any;
  // refresh = new BehaviorSubject<boolean>(false);
  user: StudentModel = new StudentModel();

  studentForm: FormGroup;

  constructor(private service: StudentService, private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any,
    public nav: NavbarService,
    private router: Router,
    private flashmessage: FlashMessagesService,
    private fb: FormBuilder) {
    //getting id at url
    // this.id = this.route.snapshot.params['id'];
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
    
    // this.mySubscription = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     // Trick the Router into believing it's last link wasn't previously loaded
    //     this.router.navigated = false;
    //   }
    // });
  }
  ngOnInit(): void {
    this.fetchData();
    this.studentForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      passingYear: [this.user.passingYear, [Validators.required]],
      phone: [this.user.phone, [Validators.required]],
      rollNo: [this.user.rollNo, [Validators.required]],
      department: [this.user.department, [Validators.required]],
      address: [this.user.address, [Validators.required]],
      image: [this.user.image]
    });
    // this.refresh.subscribe(refresh => refresh === true ? this.fetchData() : '');
  }

  fetchData() {
    this.service.getStudentById(this.data.id)
      .subscribe(data => {
        this.studentDetail = data;
      });
  }


  back() {
    window.history.back();
  }

  update() {
    const value = this.studentForm.value;
    const { name, email, phone, passingYear, department, address, rollNo } = value;

    const student: StudentModel = {
      name, email, phone, passingYear, address, rollNo, department
    }
    this.service.updateStudent(student, this.studentForm.value.image, this.data.id)
      .subscribe(data => {
        console.log(data);
        if (data.success) {
          this.flashmessage.show("Successfully Updated", { timeout: 5000 });
          
        }
      });

  }

  // ngOnDestroy() {
  //   if (this.mySubscription) {
  //     this.mySubscription.unsubscribe();
  //   }
  // }




}
