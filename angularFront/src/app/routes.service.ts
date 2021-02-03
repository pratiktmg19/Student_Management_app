import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  route:string;
  constructor() {
    this.route = '';
   }

   setRoute(rout:string){
      console.log(rout);
      this.route = rout;
   }
}
