import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipelineListComponent} from "./components/pipeline-list/pipeline-list.component";
import {PipelineSearchBarComponent} from "./components/pipeline-search-bar/pipeline-search-bar.component";
import {
    PipelineRealRefreshToggleComponent
} from "./components/pipeline-real-refresh-toggle/pipeline-real-refresh-toggle.component";

@Component({
    selector: 'app-pipelines',
    templateUrl: './pipelines.component.html',
    styleUrls: ['./pipelines.component.scss'],
    standalone: true,
    imports: [CommonModule, PipelineListComponent, PipelineSearchBarComponent, PipelineRealRefreshToggleComponent]
})
export class PipelinesComponent {
}
