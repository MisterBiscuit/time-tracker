import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

import {ProjectListComponent} from '@features/projects/project-list/project-list.component';
import {ProjectStore} from '@shared/stores/project.store';
import {Project} from '@shared/interfaces';

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
  public readonly projectStore = inject(ProjectStore);

  public openForm(item?: Project): void {
    this.projectStore.openForm(item);
  }

  public remove(id: string): void {
    this.projectStore.remove(id);
  }
}
