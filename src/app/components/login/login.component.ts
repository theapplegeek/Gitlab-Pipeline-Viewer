import {Component} from '@angular/core';
import {OidcSecurityService} from "angular-auth-oidc-client";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    constructor(private oidcSecurityService: OidcSecurityService,
                private router: Router) {
        this.oidcSecurityService.checkAuth().subscribe((auth) => {
            if (auth.isAuthenticated)
                this.router.navigate(['/']);
        });
    }

    public login() {
        this.oidcSecurityService.authorize();
    }
}
