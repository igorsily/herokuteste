import { Injectable, Inject, forwardRef } from "@angular/core";
import {
    HttpEvent,
    HttpRequest,
    HttpHandler,
    HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { AuthService } from "app/services/auth.service";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    constructor(@Inject(forwardRef(() => AuthService)) private auth: AuthService) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        if (req.url.includes(environment.paths.user)) {
            return next.handle(req);
        }

        const token = this.auth.getToken;

        if (token != null) {
            const modified = req.clone({ setHeaders: { "Authorization": `Token ${token}` } });
            return next.handle(modified);
        }

        return next.handle(req);
    }
}