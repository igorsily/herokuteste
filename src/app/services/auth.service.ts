import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

import { environment } from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private ngZone: NgZone, private router: Router) { }

    login(data) {
        
        this.http.post(`${environment.apiUrl}/login/`, data).subscribe(
            response => {
                this.ngZone.run(() => {
                    this.router.navigate([''])
                });
                localStorage.setItem('authToken', response['token'])
            },
            err => {
                console.log(err);
            }
        );

    }

    logout() {
        localStorage.removeItem('authToken')
        this.ngZone.run(() => {
            this.router.navigate(['login'])
        });

    }

    get isLoggedIn(): boolean {

        const token = localStorage.getItem('authToken');

        return token != null ? true : false;
    }

    get getToken(): String {

        return localStorage.getItem('authToken');

    }


}