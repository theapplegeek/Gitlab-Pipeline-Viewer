import {Component} from '@angular/core';
import {OidcSecurityService} from "angular-auth-oidc-client";
import {Router, RouterOutlet} from "@angular/router";
import {NavbarService} from "./shared/services/navbar.service";
import {NgIf, AsyncPipe} from '@angular/common';
import {ButtonModule} from "primeng/button";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {AvatarModule} from "primeng/avatar";
import {DividerModule} from "primeng/divider";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [NgIf, RouterOutlet, AsyncPipe, ButtonModule, OverlayPanelModule, AvatarModule, DividerModule]
})
export class AppComponent {

    public get navbarVisible(): boolean {
        return this.navbarService.navbarVisibility();
    }

    constructor(public oidcSecurityService: OidcSecurityService,
                private navbarService: NavbarService,
                private router: Router) {
        this.oidcSecurityService.checkAuth().subscribe();
    }

    public logout() {
        this.oidcSecurityService.logoffAndRevokeTokens('gitlab').subscribe(() => {
            this.oidcSecurityService.logoffLocal();
            this.router.navigate(['/login']);
        });
    }
}
