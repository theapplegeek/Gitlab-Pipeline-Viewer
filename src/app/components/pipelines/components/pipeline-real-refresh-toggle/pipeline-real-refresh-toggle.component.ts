import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelinesService} from "../../services/pipelines.service";
import {ToggleButtonModule} from "primeng/togglebutton";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TooltipModule} from "primeng/tooltip";

@Component({
    selector: 'app-pipeline-real-refresh-toggle',
    standalone: true,
    imports: [CommonModule, ToggleButtonModule, FormsModule, ReactiveFormsModule, TooltipModule],
    templateUrl: './pipeline-real-refresh-toggle.component.html',
    styleUrls: ['./pipeline-real-refresh-toggle.component.scss']
})
export class PipelineRealRefreshToggleComponent {
    constructor(public pipelinesService: PipelinesService) {
    }
}
