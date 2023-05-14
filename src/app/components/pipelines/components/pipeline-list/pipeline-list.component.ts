import {Component, computed} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {AccordionModule} from "primeng/accordion";
import {PipelineDetailComponent} from "../pipeline-detail/pipeline-detail.component";
import {
    PipelineStatusIconComponent
} from "../../../../shared/components/pipeline-status-icon/pipeline-status-icon.component";
import {SharedModule} from "primeng/api";
import {SkeletonModule} from "primeng/skeleton";
import {PipelinesService} from "../../services/pipelines.service";

@Component({
    selector: 'app-pipeline-list',
    standalone: true,
    imports: [CommonModule, AccordionModule, PipelineDetailComponent, PipelineStatusIconComponent, SharedModule, SkeletonModule, DatePipe],
    templateUrl: './pipeline-list.component.html',
    styleUrls: ['./pipeline-list.component.scss']
})
export class PipelineListComponent {
    constructor(public pipelineService: PipelinesService) {
    }
}
