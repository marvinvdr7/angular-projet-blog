import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserUpdateInfo } from '../../models/UserUpdate';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../models/Role';
import { RoleService } from '../../services/role.service';
import { Permission } from '../../models/Permission';
import { UserRole } from '../../models/UserRole';
import { UserRoleService } from '../../services/user-role.service';
import { UserPermission } from '../../models/UserPermission';
import { UserPermissionService } from '../../services/user-permission.service';
import { UserPermissionTrace } from '../../models/UserPermissionTrace';
import { DataService } from 'src/app/layouts/services/data.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  title: string = 'Modifier un membre';

  userId: number;
  currentRoles: Role[] = [];
  roles: Role[];
  userPermissions: UserPermission[] = [];

  userUpdateInfoForm: FormGroup;

  errorUsernameExist: boolean = false;
  errorEmailExist: boolean = false;

  user: UserUpdateInfo;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userRoleService: UserRoleService,
    private userPermissionService: UserPermissionService,
    private roleService: RoleService,
    private routeActive: ActivatedRoute,
    private router: Router,
    private dataService: DataService ) { }

  ngOnInit(): void {
    this.userId = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.dataService.changeTitleSidenav(this.title);
    this.getUser();
    this.getRolesByUser();
    this.getPermissionsByUser();
    this.getRoles();

    this.userUpdateInfoForm = this.formBuilder.group({
      id: [this.userId],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern("[a-zA-Z]{1,}")]],
      firstname: ['default', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern("[a-zA-Z]{1,}")]],
      lastname: ['default', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern("[a-zA-Z]{1,}")]],
      email: ['default', [Validators.required, Validators.email]]
    });
  }

  // Récupere le user via l'id en paramètre de l'url
  public getUser(): void {
    let response = this.userService.getUser(this.userId);
    response.subscribe(data => {
      this.user = data as UserUpdateInfo;
    });
  }

  // Récupere tous les roles de l'application
  public getRoles(): void {
    let response = this.roleService.getAllRole();
    response.subscribe(data => {
      this.roles = data;
    });
  }

  // Récupere tous les roles du user entrain d'être édité
  public getRolesByUser(): void {
    let response = this.roleService.getRoleByUser(this.userId);
    response.subscribe(data => {
      this.currentRoles = data;
    });
  }

  // Récupere toutes les permission du user entrain d'être édité
  public getPermissionsByUser(): void {
    let response = this.userPermissionService.getAllByUserId(this.userId);
    response.subscribe(data => {
      this.userPermissions = data;
    });
  }

  public onSubmitUpdateUserInfo(): void {
    if(this.checkIfUsernameExist() &&
      this.checkIfEmailExist()) {
      if(this.userUpdateInfoForm.valid) {
        this.updateUserInfo();
      }
    }
  }

  // Modifie les infos du user
  public updateUserInfo(): void {
    const updateUser: UserUpdateInfo = this.userUpdateInfoForm.value;
    let response = this.userService.updateUser(updateUser);
    response.subscribe(() => {
      this.router.navigate(["/user-list/"]);
    });
  }

  // TODO
  public checkIfUsernameExist(): boolean {
    console.log("TODO check username ok")
    this.errorUsernameExist = false;
    return true;
  }

  // TODO
  public checkIfEmailExist(): boolean {
    console.log("TODO check email ok")
    this.errorEmailExist = false;
    return true;
  }

  public addRoleToUser(role: Role) {
    // Création du UserRole
    const userRole: UserRole = {
      id_user: this.user.id,
      id_role: role.id
    }

    // Envoi le UserRole en DB
    this.userRoleService.createUserRoles(this.user.id, role.id).subscribe(() => {
      // Réinitialise les roles du user
      this.getRolesByUser();
    });

    // Pour chaque permission du nouveau role
    role.permissions.forEach(permission => {
      // on regarde dans la liste des UserPermission si l'id est déja présente
      if(this.userPermissions.some(ur => ur.permission_id === permission.id)) {
      console.log("la permission existe déjà: " + permission.id);
      } else {
      // sinon on ajoute en db le UserPermission
      console.log("la permission n'existe pas, on l'ajoute: " + permission.id);

        // Création du UserPermission
        const userPermission: UserPermission = {
         user_id: this.userId,
         permission_id: permission.id,
         start_date: null
        }

        console.log(userPermission);
        
        this.userPermissionService.createUserPermission(this.userId, permission.id).subscribe(data => {
          console.log(data);
          // Reinitialise la liste des permission du user
          this.getPermissionsByUser();
        });
      }
    });
  }

  public removeRoleToUser(role: Role) {
    this.userRoleService.deleteByUserAndRole(this.userId, role.id).subscribe(() => {
      // Réinitialise les roles du user
      this.getRolesByUser();
    });

    // recupere les permissions des role restant
    let currentPermissions: Permission[] = [];
    console.log("Permission des roles restant :");
    this.currentRoles.forEach(cr => {
      if(cr.name !== role.name) 
        cr.permissions.forEach(permission => {
          currentPermissions.push(permission);
        });
    });

    role.permissions.forEach(permissionFind => {
      if(currentPermissions.some(cp => cp.name === permissionFind.name)) {
        console.log("Toujours ok:"+ permissionFind.name);
      } else { 
        console.log("plus dans la liste, on suprimme"+ permissionFind.name);

        let upt: UserPermissionTrace = {
          permission_id: permissionFind.id,
          user_id: this.userId,
        }

        this.userPermissionService.deleteByUserAndPermission(this.userId, permissionFind.id).subscribe(data => {
          console.log(data);
          // Reinitialise la liste des permission du user
          this.getPermissionsByUser();
        });
        this.userPermissionService.createTraceUserPermission(upt).subscribe();
      }
    });
  }

  public compareName(roleFind: Role, currentRoles: Role[]) {
    if(currentRoles.some(currentRole => currentRole.name === roleFind.name)) {
      return true;
    } else { return false; }
  }
}