import {Component} from '@angular/core';
import {OidcSecurityService} from "angular-auth-oidc-client";
import {Router} from "@angular/router";
import {NavbarService} from "./shared/services/navbar.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public navbarVisible: boolean = true;

    constructor(public oidcSecurityService: OidcSecurityService,
                private navbarService: NavbarService,
                private router: Router) {
        this.navbarService.navbarVisibility$.subscribe((visible: boolean) => {
            this.navbarVisible = visible;
        });
        this.oidcSecurityService.checkAuth().subscribe();
    }

    public logout() {
        this.oidcSecurityService.logoffAndRevokeTokens('gitlab').subscribe(() => {
            this.oidcSecurityService.logoffLocal();
            this.router.navigate(['/login']);
        });
    }
}
