import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipelinesRoutingModule } from './pipelines-routing.module';
import { PipelinesComponent } from './pipelines.component';


@NgModule({
  declarations: [
    PipelinesComponent
  ],
  imports: [
    CommonModule,
    PipelinesRoutingModule
  ]
})
export class PipelinesModule { }
