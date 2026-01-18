import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

import {ProjectListComponent} from '@features/projects/project-list/project-list.component';
import {ProjectStore} from '@shared/stores/project.store';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    FormsModule,
    ProjectListComponent,
    MatButton,
  ],
  templateUrl: './projects.page.html',
})
export class ProjectsPage {
  private readonly projectStore = inject(ProjectStore);

  public openForm(): void {
    this.projectStore.openForm();
  }
}
