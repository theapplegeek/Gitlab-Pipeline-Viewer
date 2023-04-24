import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PipelinesRoutingModule} from './pipelines-routing.module';
import {PipelinesComponent} from './pipelines.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PipelineDetailComponent } from './components/pipeline-detail/pipeline-detail.component';


@NgModule({
    declarations: [
        PipelinesComponent,
        PipelineDetailComponent
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
