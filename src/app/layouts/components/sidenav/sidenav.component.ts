import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ApplicationService } from 'src/app/application.service';
import { DataService } from '../../services/data.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @ViewChild(RouterOutlet) titleRef;

  navTitle: string;

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  navmode: string;
  spacetopnav: string;
  opened: boolean = true;

  constructor( 
    private headerService: HeaderService, 
    public authService:AuthenticationService,
    private applicationService: ApplicationService,
    private dataService: DataService,
    private cdRef: ChangeDetectorRef ) { }


  ngOnInit(): void {
    this.dataService.$changeTitleSidenav
    .subscribe(data => {
      this.navTitle = data;
      console.log(data)
    });

    this.headerService.$isToggleClicked
    .subscribe(data => {
      this.sidenav.toggle()
      console.log("Data in sidenav", data);
    });
  }

  public getDeviceSize(): boolean {
    return this.applicationService.getDeviceSize();
  }

  public changeSpaceTopNav(): string {
    if(this.getDeviceSize()){
      return "top54";
    }else {
      return "top64";
    }
  }

  public changeModeSideNav() {
    if(this.getDeviceSize()){
      return "over";
    }else {
      return "side";
    }
  }

  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  }
}