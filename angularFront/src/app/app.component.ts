import { Component } from '@angular/core';
import { RoutesService} from './routes.service';
import { Router, NavigationEnd, Event} from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularFront';
  
  constructor(private routes:RoutesService,
    public router: Router,) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
          this.routes.setRoute(event.url);
      }
    });
  }

}
