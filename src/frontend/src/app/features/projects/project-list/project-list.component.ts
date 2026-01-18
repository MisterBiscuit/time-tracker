import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMiniFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';

import {ProjectDot} from '@features/projects/project-dot/project-dot.component';
import {Project} from '@shared/interfaces';
import {ProjectStore} from '@shared/stores/project.store';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    MatIcon,
    ReactiveFormsModule,
    FormsModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    MatMiniFabButton,
    ProjectDot
  ],
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent {
  public readonly projectStore = inject(ProjectStore);

  public readonly displayedColumns: string[] = ['name', 'colour', 'actions'];

  public openForm(project?: Project): void {
    this.projectStore.openForm(project);
  }

  public remove(id: string): void {
    this.projectStore.remove(id);
  }
}
