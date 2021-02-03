import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog'
import { StudentDetailsComponent } from '../student-details/student-details.component';
import { StudentService} from '../student.service'
import {Router} from '@angular/router' 

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements OnInit {
  
  id:number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private router:Router,
  private dialog:MatDialog, public service:StudentService) {
   }

  ngOnInit(): void {
  }
  onCopy(){
    console.log(this.data.element);
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(this.data.element);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
   
  }
  // onEdit(id){
  //   // this.dialog.open(StudentDetailsComponent, {data:{id}})
    
  // }

  
  
  onDelete(id){
    if(confirm("Are you sure?")){
      this.service.deleteStudent(id)
        .subscribe(data =>{
          console.log(data);
          });
          // this.router.navigate(['/studentlist']); // use redirect to studentlist
        
    }
    
  }

}
