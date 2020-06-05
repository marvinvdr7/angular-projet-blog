import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layouts/layout.module';
import { AuthModule } from './pages/auth/auth.module';
import { UserModule } from './pages/user/user.module';
import { PostModule } from './pages/post/post.module';
import { AuthenticationService } from './core/services/authentication.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './core/interceptors/token-interceptor.service';
import { CategoryModule } from './pages/category/components/category.module';
import { RoleModule } from './pages/role/role.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    AuthModule,
    UserModule,
    PostModule,
    CategoryModule,
    RoleModule
  ],
  providers: [AuthenticationService, 
    {  
      provide:HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi:true 
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
