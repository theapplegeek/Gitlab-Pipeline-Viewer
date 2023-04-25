import {Component, Input} from '@angular/core';
import {PipelineNode} from "../../graphQL/get-projects-and-pipelines/get-projects-and-pipelines.service";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-pipeline-detail',
  templateUrl: './pipeline-detail.component.html',
  styleUrls: ['./pipeline-detail.component.scss']
})
export class PipelineDetailComponent {
  @Input() public pipeline!: PipelineNode;
  @Input() public showDivider = true;

  public getTimePassed(createdAt: string): string {
    const difference = new Date().getTime() - new Date(createdAt).getTime();
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return days + " days ago";
    } else if (hours > 0) {
      return hours + " hours ago";
    } else if (minutes > 0) {
      return minutes + " minutes ago";
    } else {
      return seconds + " seconds ago";
    }
  }

  public openPipelineInNewTab(path: string): void {
    window.open(`${environment.gitlabUrl}${path}`, '_blank');
  }
}
