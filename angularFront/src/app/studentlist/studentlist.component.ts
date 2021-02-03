import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { StudentService } from '../student.service';
import { MatDialog} from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';
import { Router} from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table'
import { StudentModel } from '../models/student.model';
import { ShowDetailComponent } from '../show-detail/show-detail.component';
import { NavbarService} from '../navbar.service';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})

export class StudentlistComponent implements OnInit {

  r:[];

  test:string;
  id;
  element:any

  datasource;

  // studentList :any;

  // public displayedColumns: string[] = ['photo','name', 'email', 'department','actions'];

  // public datasource = new MatTableDataSource<StudentModel>();

  // @ViewChild(MatSort, {static:false}) sort:MatSort;
  // @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private service:StudentService, private dialog:MatDialog, 
    public nav:NavbarService, private router:Router) { 
      
    }

  ngOnInit(): void {
   
    this.nav.show();
    this.getAllStudent();
  }
  

  // ngAfterViewInit() : void{
  //   this.datasource.sort = this.sort;
  //   this.datasource.paginator = this.paginator;
  // }

  public getAllStudent = () =>{
    this.service.getStudentList()
    .subscribe(res =>{
      this.datasource = res as StudentModel[];
    });
  }
  


public doFilter = (value: string) => {
    this.datasource.filter = value.trim().toLocaleLowerCase();
  }

  openDialog(){
    this.dialog.open(AddStudentComponent);
  }


  // update(id){
  //   console.log(id);

  // }
  detailsDialog(element){
    this.dialog.open(ShowDetailComponent,{data:{element}})
  }



}
