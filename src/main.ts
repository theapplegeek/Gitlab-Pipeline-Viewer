import {importProvidersFrom} from '@angular/core';
import {AppComponent} from './app/app.component';
import {AuthConfigModule} from './app/auth/auth-config.module';
import {NgOptimizedImage} from '@angular/common';
import {AppRoutingModule} from './app/app-routing.module';
import {SharedModule} from './app/shared/shared.module';
import {provideAnimations} from '@angular/platform-browser/animations';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, SharedModule, AppRoutingModule, NgOptimizedImage, AuthConfigModule),
        provideAnimations()
    ]
})
  .catch(err => console.error(err));
