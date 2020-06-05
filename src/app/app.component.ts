import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { ApplicationService } from './application.service';
import { AuthenticationService } from './core/services/authentication.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-sidenav';
  mediaSub: Subscription;

  constructor(
    private mediaObserver: MediaObserver, 
    private applicationService: ApplicationService,
    private authService: AuthenticationService ) { }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange) => {
      console.log(result.mqAlias);
      if(result.mqAlias === 'xs') {
        this.applicationService.deviceXs = true;
      } else {
        this.applicationService.deviceXs = false;
      }
    });
   }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }
}