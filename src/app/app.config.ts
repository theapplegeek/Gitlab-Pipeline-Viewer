import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {BrowserModule} from "@angular/platform-browser";
import {provideAnimations} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, provideHttpClient} from "@angular/common/http";
import {AuthInterceptor} from "./shared/auth/auth.interceptor";
import {AuthConfigModule} from "./shared/auth/auth-config.module";
import {provideApollo} from "apollo-angular";
import {createApollo} from "./shared/configs/graphql.config";
import {providePrimeNG} from "primeng/config";
import DefaultPreset from "./shared/configs/primeng-theme.config";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        importProvidersFrom(BrowserModule, AuthConfigModule),
        provideHttpClient(),
        provideAnimations(),
        providePrimeNG({
            ripple: true,
            theme: {
                preset: DefaultPreset,
                options: {
                    prefix: 'p',
                    darkModeSelector: '.dark-mode',
                    cssLayer: false
                }
            }
        }),
        provideApollo(createApollo),
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ]
};
