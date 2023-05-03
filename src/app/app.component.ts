import {Component, OnInit} from '@angular/core';
import {OidcSecurityService} from "angular-auth-oidc-client";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private oidcSecurityService: OidcSecurityService,
                private router: Router) {
    }

    public logout() {
        this.oidcSecurityService.logoffAndRevokeTokens('gitlab').subscribe((result) => {
            this.oidcSecurityService.logoffLocal();
            this.router.navigate(['/login']);
        });
    }
}
