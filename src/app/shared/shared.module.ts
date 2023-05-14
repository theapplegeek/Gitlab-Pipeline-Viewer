import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {GraphQLModule} from "./modules/graphql.module";
import {PipelineStatusIconComponent} from './components/pipeline-status-icon/pipeline-status-icon.component';

@NgModule({
    imports: [
        CommonModule,
        GraphQLModule,
        HttpClientModule,
        PipelineStatusIconComponent
    ],
    exports: [
        PipelineStatusIconComponent,
        GraphQLModule,
        HttpClientModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ],
})
export class SharedModule {
}
