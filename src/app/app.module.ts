import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared.module";
import {LoginComponent} from './components/login/login.component';
import {NgOptimizedImage} from "@angular/common";
import {AuthConfigModule} from './auth/auth-config.module';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
    ],
    imports: [
        SharedModule,
        AppRoutingModule,
        NgOptimizedImage,
        AuthConfigModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
