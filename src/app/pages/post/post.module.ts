import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { MaterialModule } from 'src/app/utils/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostAllComponent } from './components/post-all/post-all.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostUpdateComponent } from './components/post-update/post-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostCategoryComponent } from './components/post-category/post-category.component';
import { MaxCharPipe } from 'src/app/core/pipes/max-char.pipe';

@NgModule({
  declarations: [
    PostListComponent,
    PostDetailsComponent,
    PostAllComponent,
    PostCreateComponent,
    PostUpdateComponent,
    PostCategoryComponent,
    MaxCharPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PostListComponent,
    PostDetailsComponent,
    MaxCharPipe
  ],
})
export class PostModule { }
