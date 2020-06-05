import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryAllComponent } from './category-all/category-all.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryUpdateComponent } from './category-update/category-update.component';



@NgModule({
  declarations: [
    CategoryAllComponent,
    CategoryCreateComponent,
    CategoryListComponent,
    CategoryUpdateComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CategoryAllComponent,
    CategoryCreateComponent,
    CategoryListComponent,
  ],
})
export class CategoryModule { }
