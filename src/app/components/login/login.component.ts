import {Component} from '@angular/core';
import {OidcSecurityService} from "angular-auth-oidc-client";
import {Router} from "@angular/router";
import {NavbarService} from "../../shared/services/navbar.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    constructor(private oidcSecurityService: OidcSecurityService,
                private navbarService: NavbarService,
                private router: Router) {
        this.oidcSecurityService.checkAuth().subscribe((auth) => {
            if (auth.isAuthenticated)
                this.router.navigate(['/']);
        });
        this.navbarService.setNavbarVisibility(false);
    }

    public login() {
        this.oidcSecurityService.authorize();
    }
}
