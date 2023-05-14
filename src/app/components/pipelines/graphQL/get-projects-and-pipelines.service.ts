import {Injectable} from '@angular/core';
import {gql, Query} from "apollo-angular";

export enum PipelineStatusEnum {
    CREATED = 'CREATED',
    PENDING = 'PENDING',
    RUNNING = 'RUNNING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    CANCELED = 'CANCELED',
}

export interface Commit {
    webUrl: string;
    shortId: string;
    message: string;
    authorName: string;
}

export interface PipelineNode {
    path: string;
    active: boolean;
    status: string;
    duration: number;
    createdAt: string;
    commit: Commit;
}

export interface ProjectNode {
    id: string;
    name: string;
    lastActivityAt: Date;
    pipelines: {
        nodes: PipelineNode[];
    };
}

export interface GetProjectsData {
    projects: {
        nodes: ProjectNode[];
    };
}

@Injectable({
    providedIn: 'root'
})
export class GetProjectsAndPipelinesService extends Query<GetProjectsData>{
    override document = gql`
    query GetProjects($search: String, $status: PipelineStatusEnum) {
        projects(membership: true, search: $search, searchNamespaces: true) {
          nodes {
            id
            name
            lastActivityAt
            pipelines(first: 5, status: $status) {
              nodes {
                path
                active
                status
                duration
                createdAt
                commit {
                  webUrl
                  message
                  shortId
                  authorName
                }
              }
            }
          }
        }
    }`;
}
