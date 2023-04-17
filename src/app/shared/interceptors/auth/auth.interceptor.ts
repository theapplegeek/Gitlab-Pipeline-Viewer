import {Injectable} from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import {catchError, map, Observable, Subject, switchMap, tap, throwError} from 'rxjs';
import {LoginResponse, OidcSecurityService} from "angular-auth-oidc-client";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private refreshTokenInProgress: boolean = false;

    private tokenRefreshedSource = new Subject();
    private tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

    constructor(private oidcSecurityService: OidcSecurityService,
                private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.includes("/oauth"))
            return next.handle(request);

        return this.addTokenHeader(request).pipe(
            switchMap((request) => {
                return next.handle(request).pipe(
                    catchError((error) => {
                        return this.handleResponseError(error, request, next);
                    })
                );
            })
        );
    }

    private addTokenHeader(request: HttpRequest<any>) {
        return this.oidcSecurityService.getAccessToken().pipe(
            map((token: string) => {
                if (token !== null) {
                    const httpOptions = {
                        headers: new HttpHeaders({
                            Authorization: 'Bearer ' + token,
                        }),
                    };
                    request = request.clone(httpOptions);
                }
                return request;
            })
        );
    }

    private handleResponseError(
        error: HttpErrorResponse,
        request?: HttpRequest<any>,
        next?: HttpHandler
    ): Observable<any> {
        if (error.status === 401 && request && next) {
            if (request.url.includes("/refresh_token")) {
                return throwError(() => error);
            }
            return this.refreshToken().pipe(
                switchMap(() => {
                    return this.addTokenHeader(request).pipe(
                        switchMap((request) => {
                            return next.handle(request);
                        })
                    );
                }),
                catchError((e) => {
                    if (e.status !== 401) {
                        return this.handleResponseError(e);
                    } else {
                        this.oidcSecurityService.logoffAndRevokeTokens('gitlab').subscribe((result) => {
                            this.oidcSecurityService.logoffLocal();
                            this.router.navigate(['/login']);
                        });
                        return throwError(() => e);
                    }
                })
            );
        }
        return throwError(() => error);
    }

    private refreshToken(): Observable<any> {
        if (this.refreshTokenInProgress) {
            return new Observable((observer) => {
                this.tokenRefreshed$.subscribe(() => {
                    observer.next();
                    observer.complete();
                });
            });
        } else {
            this.refreshTokenInProgress = true;
            return this.oidcSecurityService.forceRefreshSession().pipe(
                tap((data: LoginResponse) => {
                    this.refreshTokenInProgress = false;
                    this.tokenRefreshedSource.next(data);
                }),
                catchError((error) => {
                    this.refreshTokenInProgress = false;
                    this.oidcSecurityService.logoffAndRevokeTokens('gitlab').subscribe((result) => {
                        this.oidcSecurityService.logoffLocal();
                        this.router.navigate(['/login']);
                    });
                    return throwError(() => error);
                })
            );
        }
    }
}
