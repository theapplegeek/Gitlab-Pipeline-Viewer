import {NgModule} from '@angular/core';
import {AuthModule} from 'angular-auth-oidc-client';
import {environment} from "../../environments/environment";


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            configId: 'gitlab',
            authority: 'https://gitlab.com',
            redirectUrl: window.location.origin,
            postLogoutRedirectUri: window.location.origin + '/login',
            clientId: environment.clientId,
            scope: environment.scope, // 'openid profile offline_access ' + your scopes
            responseType: 'code',
            silentRenew: false,
            useRefreshToken: true,
        }
    })],
    exports: [AuthModule],
})
export class AuthConfigModule {
}
