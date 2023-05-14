import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimeNgModule} from "./modules/prime-ng.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {GraphQLModule} from "./modules/graphql.module";
import {PipelineStatusIconComponent} from './components/pipeline-status-icon/pipeline-status-icon.component';

@NgModule({
    declarations: [
        PipelineStatusIconComponent
    ],
    imports: [
        CommonModule,
        PrimeNgModule,
        GraphQLModule,
        HttpClientModule
    ],
    exports: [
        PipelineStatusIconComponent,
        PrimeNgModule,
        GraphQLModule,
        HttpClientModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ],
})
export class SharedModule {
}
