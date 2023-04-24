import {Injectable} from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import {catchError, map, Observable, of, Subject, switchMap, tap, throwError} from 'rxjs';
import {LoginResponse, OidcSecurityService} from "angular-auth-oidc-client";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private refreshTokenInProgress: boolean = false;

    private tokenRefreshedSource = new Subject();
    private tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

    constructor(private oidcSecurityService: OidcSecurityService,
                private router: Router,
                private http: HttpClient) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.includes("/oauth") || request.url.includes("/metadata"))
            return next.handle(request);

        return this.addTokenHeader(request, next);
    }

    private addTokenHeader(request: HttpRequest<any>, next: HttpHandler) {
        return this.oidcSecurityService.getAccessToken().pipe(
            switchMap((token: string) => {
                if (token !== null) {
                    const httpOptions = {
                        headers: new HttpHeaders({
                            Authorization: 'Bearer ' + token,
                        }),
                    };
                    request = request.clone(httpOptions);
                    return this.checkIfTokenIsValid(token).pipe(
                        switchMap((data: { active: boolean }) => {
                            if (data.active) return next.handle(request);
                            else {
                                return this.refreshToken().pipe(
                                    switchMap(() => {
                                        return next.handle(request);
                                    })
                                );
                            }
                        })
                    );
                }
                return next.handle(request);
            })
        );
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
                    this.oidcSecurityService.logoffAndRevokeTokens('gitlab').subscribe(() => {
                        this.oidcSecurityService.logoffLocal();
                        this.router.navigate(['/login']);
                    });
                    return throwError(() => error);
                })
            );
        }
    }

    private checkIfTokenIsValid(token: string) {
        return this.http.get('https://gitlab.com/api/v4/metadata', {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + token,
            })
        }).pipe(
            map(() => {
                return {active: true};
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    return of({active: false})
                } else {
                    return throwError(() => error);
                }
            })
        );
    }
}
