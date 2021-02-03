import { Component, OnInit } from '@angular/core';
import { StudentService} from '../student.service';
import { NavbarService } from '../navbar.service';
import {Chart} from 'chart.js';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  TotalStudents;
  CSE;
  IT;
  ME;
  ECE;
  EE;
  // user:any;

  constructor(private service:StudentService,public nav:NavbarService, ) { }

  chart : any;

  // public doughnutChartLabels = ['M.E', 'C.S.E', 'I.T','E.E','E.C.E'];
  // public ChartType = 'doughnut';
  // public doughnutChartData :any = [
    
  

  ngOnInit(){
    this.nav.show();
    
    this.chart1();
    
  }

  chart1(){
    this.service.getStudentList()
        .subscribe(res =>{
          this.TotalStudents = res.length;
          // console.log(res.length);

          let it = res.filter(res => res.department === 'IT');
          this.IT = it.length;
          // console.log(IT);

          let cse = res.filter(res => res.department === 'CSE');
           this.CSE = cse.length;
          // console.log(CSE);


          let me = res.filter(res => res.department === 'ME');
          this.ME = me.length;
          
          let ece = res.filter(res => res.department === 'ECE');
          this.ECE = ece.length;

          let ee = res.filter(res => res.department === 'EE');
          this.EE = it.length;
          // this.doughnutChartData = [this.ME, this.CSE, this.IT, this.EE, this.ECE]

          this.chart = new Chart('chartOne',{
            type: 'doughnut',
            data: {
              labels: ['M.E', 'C.S.E', 'I.T','E.E','E.C.E'],
              datasets: [{
                label: 'Division wrt Stream',
                data: [this.ME,this.CSE,this.IT,this.EE,this.ECE],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
      
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  
      
                ],
                
              }]
            }
            // options: {
            //   scales: {
            //     yAxes: [{
            //       ticks: {
            //         min:0,
            //         max:50
            //       }
            //     }]
            //   }
            // }
          

        })
  })

}
}
//   ngOnInit(): void {
//       this.service.getIT()
//         .subscribe(data =>{
          
//           this.IT = data;
//           console.log(this.IT)
//         })

//         this.service.getCSE()
//         .subscribe(data =>{
//           this.CSE = data;
//           console.log(this.CSE)
//         })

//         this.doughnutChartData = [2, 1, 11, 45, 12]
//   }
// }
