import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { ApplicationService } from 'src/app/application.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void { }

  public getDeviceSize(): boolean {
    return this.applicationService.getDeviceSize();
  }

}
