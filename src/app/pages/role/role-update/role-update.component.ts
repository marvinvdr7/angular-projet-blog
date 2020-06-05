import { Component, OnInit } from '@angular/core';
import { Permission } from '../../user/models/Permission';
import { RoleService } from '../../user/services/role.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/layouts/services/data.service';
import { Role } from '../../user/models/Role';
import { PermissionService } from '../../user/services/permission.service';
import { RolePermission } from '../../user/models/RolePermission';
import { RolePermissionService } from '../../user/services/role-permission.service';

@Component({
  selector: 'app-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.css']
})
export class RoleUpdateComponent implements OnInit {

  title: string = 'Modifier un role';

  roleId: number;
  currentPermissions: Permission[] = [];
  permissions: Permission[];

  role: Role;

  constructor(private roleService: RoleService,
    private routeActive: ActivatedRoute,
    private dataService: DataService, 
    private permissionService: PermissionService,
    private rolePermissionService: RolePermissionService ) { }

  ngOnInit(): void {
    this.roleId = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.dataService.changeTitleSidenav(this.title);
    this.getRole();
    this.getPermissionByRole();
  }

  public getRole(): void {
    let response = this.roleService.getRole(this.roleId);
    response.subscribe(data => {
      this.role = data as Role;
      console.log(this.role)
    });
  }

  public getPermissionByRole(): void {
    let response = this.permissionService.getPermissionByRole(this.roleId);
    response.subscribe(data => {
      this.currentPermissions = data as Permission[];
    });
  }


  public addPermissionToRole(permission: Permission) {
    const rolePermission: RolePermission = {
      id_role: this.role.id,
      id_permission: permission.id
    }

    this.rolePermissionService.createRolePermission(this.role.id, permission.id).subscribe(() => {
      this.getPermissionByRole();
    });

  }

  public compareName(permissionFind: Permission, currentPermissions: Permission[]) {
    if(currentPermissions.some(currentPermission => currentPermission.name === permissionFind.name)) {
      return true;
    } else { return false; }
  }
}
