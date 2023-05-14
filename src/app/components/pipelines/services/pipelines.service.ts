import {effect, Injectable, signal} from '@angular/core';
import {
    GetProjectsAndPipelinesService,
    PipelineStatusEnum,
    ProjectNode
} from "../graphQL/get-projects-and-pipelines.service";

interface PipelineTabsState {
    id: string;
    state: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class PipelinesService {

    public isLoading = signal<boolean>(false);
    public projects = signal<ProjectNode[]>([]);
    public selectedStatus = signal<PipelineStatusEnum | undefined>(undefined);
    public search = signal<string>("");

    public reloadPipelineStatus = signal<boolean>(false);
    private timer: any;

    public pipelineTabsState = signal<PipelineTabsState[]>([]);

    constructor(private getProjectsAndPipelinesService: GetProjectsAndPipelinesService) {
        this.startWatchReloadPipelineStatus();
    }

    public searchPipelines(search: string, status?: PipelineStatusEnum) {
        this.isLoading.set(true);
        this.search.set(search);
        this.selectedStatus.set(status);
        this.reloadPipelineStatus.set(false);
        this.getProjectsAndPipelines(() => {
            this.pipelineTabsState.update((oldValue: PipelineTabsState[]) => {
                return this.projects().map((project) => {
                    return {
                        id: project.id,
                        state: false,
                    }
                });
            });
            this.isLoading.set(false);
        });
    }

    private startWatchReloadPipelineStatus() {
        effect(() => {
            if (this.reloadPipelineStatus()) {
                this.timer = setInterval(() => {
                    this.getProjectsAndPipelines(() => {
                        this.pipelineTabsState.update((oldValue: PipelineTabsState[]) => {
                            return this.projects().map((project) => {
                                return {
                                    id: project.id,
                                    state: oldValue.find((value) => value.id === project.id)?.state || false,
                                }
                            });
                        });
                    });
                }, 5000);
            } else {
                clearInterval(this.timer);
            }
        });
    }

    private getProjectsAndPipelines(callback?: () => void) {
        let data: { search?: string, status?: PipelineStatusEnum } = {};
        if (this.search() !== "") data.search = this.search();
        if (this.selectedStatus()) data.status = this.selectedStatus();

        this.getProjectsAndPipelinesService
            .watch({...data})
            .valueChanges
            .subscribe({
                next: (result) => {
                    let projects = {...result.data.projects};
                    this.projects.set(projects.nodes.filter((pipeline) => pipeline.pipelines.nodes.length > 0));
                    callback && callback();
                }, error: () => callback && callback()
            });
    }

    public getPipelineStateFromId(id: string): boolean {
        return this.pipelineTabsState().find((value) => value.id === id)?.state || false;
    }

    public setPipelineStateFromId(id: string, state: boolean) {
        this.pipelineTabsState.update((oldValue: PipelineTabsState[]) => {
            return oldValue.map((value) => {
                if (value.id === id) {
                    value.state = state;
                }
                return value;
            });
        });
    }
}
