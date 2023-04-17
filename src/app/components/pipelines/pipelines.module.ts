import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PipelinesRoutingModule} from './pipelines-routing.module';
import {PipelinesComponent} from './pipelines.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    declarations: [
        PipelinesComponent
    ],
    imports: [
        CommonModule,
        PipelinesRoutingModule,
        SharedModule
    ]
})
export class PipelinesModule {
}
