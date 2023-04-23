import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-pipeline-status-icon',
  templateUrl: './pipeline-status-icon.component.html',
  styleUrls: ['./pipeline-status-icon.component.scss']
})
export class PipelineStatusIconComponent {
  @Input() public status?: string;
  @Input() public size: number = 16

  public get iconSrc(): string {
    return `assets/gitlab/${this.status?.toLowerCase()}.svg`
  }
}
