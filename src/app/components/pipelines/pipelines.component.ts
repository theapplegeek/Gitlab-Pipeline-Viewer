import {Component, OnDestroy} from '@angular/core';
import {OidcSecurityService} from "angular-auth-oidc-client";
import {HttpClient} from "@angular/common/http";
import {
    GetProjectsAndPipelinesService,
    PipelineStatusEnum,
    ProjectNode
} from "./graphQL/get-projects-and-pipelines/get-projects-and-pipelines.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-pipelines',
    templateUrl: './pipelines.component.html',
    styleUrls: ['./pipelines.component.scss']
})
export class PipelinesComponent implements OnDestroy {

    private subs = new Subscription();

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
        let data: { search?: string, status?: PipelineStatusEnum } = {};
        if (this.search !== "") data.search = this.search;
        if (this.selectedStatus) data.status = this.selectedStatus;

        this.subs.add(this.getProjectsAndPipelinesService
            .watch({...data})
            .valueChanges
            .subscribe((result) => {
                let projects = {...result.data.projects};
                this.projects = projects.nodes.filter((pipeline) => pipeline.pipelines.nodes.length > 0);
            })
        );
    }
}
