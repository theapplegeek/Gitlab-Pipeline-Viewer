import {Component} from '@angular/core';
import {OidcSecurityService} from "angular-auth-oidc-client";
import {Router} from "@angular/router";
import {NavbarService} from "../../shared/services/navbar.service";
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule]
})
export class LoginComponent {
    constructor(private oidcSecurityService: OidcSecurityService,
                private navbarService: NavbarService,
                private router: Router) {
        this.oidcSecurityService.checkAuth().subscribe((auth) => {
            if (auth.isAuthenticated)
                this.router.navigate(['/']);
        });
        this.navbarService.navbarVisibility.set(false);
    }

    public login() {
        this.oidcSecurityService.authorize();
    }
}
