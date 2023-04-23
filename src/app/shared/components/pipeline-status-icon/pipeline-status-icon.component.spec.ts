import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineStatusIconComponent } from './pipeline-status-icon.component';

describe('PipelineStatusIconComponent', () => {
  let component: PipelineStatusIconComponent;
  let fixture: ComponentFixture<PipelineStatusIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelineStatusIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipelineStatusIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
