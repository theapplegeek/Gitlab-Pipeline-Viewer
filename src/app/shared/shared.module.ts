import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimeNgModule} from "./modules/prime-ng.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth/auth.interceptor";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        PrimeNgModule
    ],
    exports: [
        PrimeNgModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ],
})
export class SharedModule {
}
