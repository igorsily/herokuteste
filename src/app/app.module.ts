import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from "@angular/common";
import localePtBr from "@angular/common/locales/pt";
import { httpInterceptorProviders } from "./interceptors/interceptor";

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AuthService } from "./services/auth.service";


import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from "./layouts/user-layout/user-layout.component";

import { LoginComponent } from '../app/pages/login/login.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { AuthGuardChildService } from './guards/auth-guard-child.service';

import {
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatIconModule
} from '@angular/material';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

registerLocaleData(localePtBr);

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule


  ],
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    SnackbarComponent
  ],
  entryComponents: [SnackbarComponent],
  providers: [httpInterceptorProviders, AuthService, AuthGuardService, AuthGuardChildService, { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3500 } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
