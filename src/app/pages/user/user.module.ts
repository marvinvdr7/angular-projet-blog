import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';



@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserUpdateComponent,
    UserSettingsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    UserListComponent,
    UserDetailsComponent,
    UserSettingsComponent
  ],
})
export class UserModule { }
