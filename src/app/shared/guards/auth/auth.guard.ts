import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {map, Observable} from 'rxjs';
import {LoginResponse, OidcSecurityService} from "angular-auth-oidc-client";
import {NavbarService} from "../../services/navbar/navbar.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard  {
    constructor(private oidcSecurityService: OidcSecurityService,
                private navbarService: NavbarService,
                private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.oidcSecurityService.isAuthenticated().pipe(
            map((isAuthenticated: boolean) => {
                if (!isAuthenticated && state.url.includes("?code=")){
                    return isAuthenticated;
                }
                if (!isAuthenticated)
                    this.router.navigate(['/login']);
                else
                    this.navbarService.setNavbarVisibility(true);
                return isAuthenticated;
            })
        );
    }
}
