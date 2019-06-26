import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from "./layouts/user-layout/user-layout.component";
import { LoginComponent } from '../app/pages/login/login.component';

import { AuthGuardChildService } from '../app/guards/auth-guard-child.service';
import { AuthGuardService } from "../app/guards/auth-guard.service";
const routes: Routes = [

  { path: 'login', canActivate: [AuthGuardService], component: LoginComponent },
  {
    path: '',
    redirectTo: 'user/dashboard',
    pathMatch: 'full',
  }, {
    path: 'user',
    canActivateChild: [AuthGuardChildService],
    component: UserLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/user-layout/user-layout.module#UserLayoutModule'
    }]
  },
  /*{
    path: 'admin',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  },*/
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
