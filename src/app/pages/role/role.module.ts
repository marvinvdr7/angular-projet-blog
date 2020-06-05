import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleUpdateComponent } from './role-update/role-update.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/utils/material.module';



@NgModule({
  declarations: [
    RoleListComponent,
    RoleUpdateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [
    RoleListComponent,
    RoleUpdateComponent
  ]
})
export class RoleModule { }
