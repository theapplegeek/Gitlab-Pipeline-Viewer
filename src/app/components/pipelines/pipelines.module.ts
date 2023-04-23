import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PipelinesRoutingModule} from './pipelines-routing.module';
import {PipelinesComponent} from './pipelines.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        PipelinesComponent
    ],
    imports: [
        CommonModule,
        PipelinesRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class PipelinesModule {
}
