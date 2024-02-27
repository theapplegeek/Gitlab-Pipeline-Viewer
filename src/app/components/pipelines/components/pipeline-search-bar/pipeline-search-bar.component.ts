import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {PipelineStatusEnum} from "../../graphQL/get-projects-and-pipelines.service";
import {PipelinesService} from "../../services/pipelines.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-pipeline-search-bar',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, DropdownModule, InputTextModule],
    templateUrl: './pipeline-search-bar.component.html',
    styleUrls: ['./pipeline-search-bar.component.scss']
})
export class PipelineSearchBarComponent {
    public statusList: PipelineStatusEnum[] = [
        PipelineStatusEnum.CREATED,
        PipelineStatusEnum.PENDING,
        PipelineStatusEnum.RUNNING,
        PipelineStatusEnum.SUCCESS,
        PipelineStatusEnum.FAILED,
        PipelineStatusEnum.CANCELED,
    ];

    public selectedStatus?: PipelineStatusEnum;
    public search: string = "";

    constructor(public pipelineService: PipelinesService) {
        // this.pipelineService.searchPipelines(this.search, this.selectedStatus);
    }

    public searchPipelines(): void {
        this.pipelineService.searchPipelines(this.search, this.selectedStatus);
    }
}
