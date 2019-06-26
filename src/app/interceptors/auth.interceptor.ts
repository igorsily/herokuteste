import { Injectable, Inject, forwardRef } from "@angular/core";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from "@angular/common/http";
import { throwError, Observable, BehaviorSubject, of } from "rxjs";
import { catchError, filter, finalize, take, switchMap } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { AuthService } from "app/services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(@Inject(forwardRef(() => AuthService)) private auth: AuthService) { }

    private AUTH_HEADER = "Authorization";
    private token = this.auth.getToken;

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (!req.url.includes(environment.paths.user)) {
            return next.handle(req);
        }
        console.warn("AuthInterceptor");
        if (!req.headers.has("Content-Type")) {
            req = req.clone({
                headers: req.headers.set("Content-Type", "application/json")
            });
        }

        req = this.addAuthenticationToken(req);

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error && error.status === 401) {
                    // 401 errors are most likely going to be because we have an expired token that we need to refresh.

                } else {
                    return throwError(error);
                }
            })
        );
    }

    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        // If we do not have a token yet then we should not set the header.
        // Here we could first retrieve the token from where we store it.
        if (!this.token) {
            return request;
        }
        // If you are calling an outside domain then do not add the token.
        if (!request.url.match(/www.abelsantana.com.br\//)) {
            return request;
        }
        return request.clone({
            headers: request.headers.set(this.AUTH_HEADER, "Token " + this.token)
        });
    }
}