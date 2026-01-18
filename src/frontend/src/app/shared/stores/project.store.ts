import {inject, Injectable} from '@angular/core';

import {ProjectFormDialogComponent} from '@features/projects/project-form-dialog/project-form-dialog.component';
import {ProjectApi} from '@shared/apis/project.api';
import {Project} from '@shared/interfaces';
import {AbstractStore} from '@shared/stores/abstract.store';

@Injectable({ providedIn: 'root' })
export class ProjectStore extends AbstractStore<Project> {
  protected readonly api = inject(ProjectApi);
  protected readonly itemLabel = 'Project';
  protected readonly dialogComponent = ProjectFormDialogComponent;
}
