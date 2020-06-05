import { Component, OnInit, ViewChild } from '@angular/core';
import { Role } from '../../user/models/Role';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from 'src/app/layouts/services/data.service';
import { RoleService } from '../../user/services/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  title: string = 'Liste des roles';

  constructor(private router: Router,
    private dataService: DataService,
    private roleService: RoleService ) { }

  roles: Role[];

  dataSource = new MatTableDataSource(this.roles);  
  displayedColumns: string[] = ['id', 'name', 'permissions', 'actions'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataService.changeTitleSidenav(this.title);
    this.getAllRole();
  }


  public goToRoleUpdate(id: number) : void {
    this.router.navigate(["/role-update/", id]);
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) 
      this.dataSource.paginator.firstPage();
  }

  public getAllRole(): void {
    let response = this.roleService.getAllRole();
    response.subscribe(datas => {
      this.dataSource.data = datas as Role[];
      this.roles = datas;
    });
  }
}
