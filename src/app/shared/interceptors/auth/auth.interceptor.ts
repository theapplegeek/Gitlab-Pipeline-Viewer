import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import {OidcSecurityService} from "angular-auth-oidc-client";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private oidcSecurityService: OidcSecurityService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.includes("/oauth"))
            return next.handle(request);

        return this.oidcSecurityService.getAccessToken().pipe(
            switchMap((token: string) => {
                const httpOptions = {
                    headers: new HttpHeaders({
                        Authorization: 'Bearer ' + token,
                    }),
                };
                return next.handle(request.clone(httpOptions));
            })
        );
    }
}
