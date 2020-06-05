import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './pages/user/components/user-list/user-list.component';
import { PostListComponent } from './pages/post/components/post-list/post-list.component';
import { RegisterComponent } from './pages/auth/components/register/register.component';
import { LoginComponent } from './pages/auth/components/login/login.component';
import { LogoutComponent } from './pages/auth/components/logout/logout.component';
import { AuthGaurdService } from './core/guards/auth-gaurd.service';
import { UserUpdateComponent } from './pages/user/components/user-update/user-update.component';
import { UserDetailsComponent } from './pages/user/components/user-details/user-details.component';
import { UserSettingsComponent } from './pages/user/components/user-settings/user-settings.component';
import { PostDetailsComponent } from './pages/post/components/post-details/post-details.component';
import { PostAllComponent } from './pages/post/components/post-all/post-all.component';
import { PostCreateComponent } from './pages/post/components/post-create/post-create.component';
import { PostUpdateComponent } from './pages/post/components/post-update/post-update.component';
import { CategoryListComponent } from './pages/category/components/category-list/category-list.component';
import { CategoryAllComponent } from './pages/category/components/category-all/category-all.component';
import { CategoryCreateComponent } from './pages/category/components/category-create/category-create.component';
import { CategoryUpdateComponent } from './pages/category/components/category-update/category-update.component';
import { PostCategoryComponent } from './pages/post/components/post-category/post-category.component';
import { MembreReadGaurdService } from './core/guards/membre-read-gaurd.service';
import { MembreWriteGaurdService } from './core/guards/membre-write-gaurd.service';
import { PostReadGaurdService } from './core/guards/post-read-gaurd.service';
import { PostWriteGaurdService } from './core/guards/post-write-gaurd.service';
import { CategoryReadGaurdService } from './core/guards/category-read-gaurd.service';
import { CategoryWriteGaurdService } from './core/guards/category-write-gaurd.service';
import { RoleReadGaurdService } from './core/guards/role-read-gaurd.service';
import { RoleWriteGaurdService } from './core/guards/role-write-gaurd.service';
import { RoleListComponent } from './pages/role/role-list/role-list.component';
import { RoleUpdateComponent } from './pages/role/role-update/role-update.component';

const routes: Routes = [

  // TODO Ameliorer les route 

  { path: '', component: PostAllComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGaurdService] },

  { path: 'user-details/:id', component: UserDetailsComponent, canActivate:[AuthGaurdService] },
  { path: 'user-settings', component: UserSettingsComponent, canActivate:[AuthGaurdService] },
  { path: 'user-list', component: UserListComponent, canActivate:[AuthGaurdService, MembreReadGaurdService] },
  { path: 'user-update/:id', component: UserUpdateComponent, canActivate:[AuthGaurdService, MembreWriteGaurdService] },

  { path: 'role-list', component: RoleListComponent, canActivate:[AuthGaurdService, RoleReadGaurdService] },
  { path: 'role-update/:id', component: RoleUpdateComponent, canActivate:[AuthGaurdService, RoleWriteGaurdService] },

  { path: 'post-all', component: PostAllComponent },
  { path: 'post-create', component: PostCreateComponent, canActivate:[AuthGaurdService, PostWriteGaurdService] },
  { path: 'post-list', component: PostListComponent, canActivate:[AuthGaurdService, PostReadGaurdService] },
  { path: 'post-details/:id', component: PostDetailsComponent },
  { path: 'post-category/:id', component: PostCategoryComponent },
  { path: 'post-update/:id', component: PostUpdateComponent, canActivate:[AuthGaurdService, PostWriteGaurdService] },

  { path: 'category-all', component: CategoryAllComponent },
  { path: 'category-list', component: CategoryListComponent, canActivate:[AuthGaurdService, CategoryReadGaurdService] },
  { path: 'category-create', component: CategoryCreateComponent, canActivate:[AuthGaurdService, CategoryWriteGaurdService] },
  { path: 'category-update/:id', component: CategoryUpdateComponent, canActivate:[AuthGaurdService, CategoryWriteGaurdService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
