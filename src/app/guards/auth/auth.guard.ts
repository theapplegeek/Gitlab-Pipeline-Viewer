import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {LoginResponse, OidcSecurityService} from "angular-auth-oidc-client";
import {NavbarService} from "../../shared/services/navbar/navbar.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private oidcSecurityService: OidcSecurityService,
                private navbarService: NavbarService,
                private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.oidcSecurityService.checkAuth().pipe(
            map((auth: LoginResponse) => {
                if (!auth.isAuthenticated)
                    this.router.navigate(['/login']);
                else
                    this.navbarService.setNavbarVisibility(true);
                return auth.isAuthenticated;
            })
        );
    }
}
