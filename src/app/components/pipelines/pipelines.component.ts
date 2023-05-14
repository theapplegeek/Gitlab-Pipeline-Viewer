import {Component, OnDestroy} from '@angular/core';
import {OidcSecurityService} from "angular-auth-oidc-client";
import {HttpClient} from "@angular/common/http";
import {
    GetProjectsAndPipelinesService,
    PipelineStatusEnum,
    ProjectNode
} from "./graphQL/get-projects-and-pipelines.service";
import {Subscription} from "rxjs";
import {PipelineDetailComponent} from './components/pipeline-detail/pipeline-detail.component';
import {PipelineStatusIconComponent} from '../../shared/components/pipeline-status-icon/pipeline-status-icon.component';
import {AccordionModule} from 'primeng/accordion';
import {SkeletonModule} from 'primeng/skeleton';
import {NgIf, NgFor, DatePipe} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from "../../shared/shared.module";

@Component({
    selector: 'app-pipelines',
    templateUrl: './pipelines.component.html',
    styleUrls: ['./pipelines.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, InputTextModule, DropdownModule, ButtonModule, NgIf, NgFor, SkeletonModule, AccordionModule, SharedModule, PipelineStatusIconComponent, PipelineDetailComponent, DatePipe]
})
export class PipelinesComponent implements OnDestroy {

    private subs = new Subscription();
    public isLoading: boolean = false;

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

    public projects: ProjectNode[] = [];

    constructor(private oidcSecurityService: OidcSecurityService,
                private http: HttpClient,
                private getProjectsAndPipelinesService: GetProjectsAndPipelinesService) {
        this.getProjectsAndPipelines();
    }

    ngOnDestroy(): void {
    }

    public getProjectsAndPipelines() {
        this.isLoading = true;
        let data: { search?: string, status?: PipelineStatusEnum } = {};
        if (this.search !== "") data.search = this.search;
        if (this.selectedStatus) data.status = this.selectedStatus;

        this.subs.add(this.getProjectsAndPipelinesService
            .watch({...data})
            .valueChanges
            .subscribe({
                next: (result) => {
                    let projects = {...result.data.projects};
                    this.projects = projects.nodes.filter((pipeline) => pipeline.pipelines.nodes.length > 0);
                    this.isLoading = false;
                }, error: () => this.isLoading = false
            })
        );
    }
}
