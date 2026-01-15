import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFabButton, MatMiniFabButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
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
import {Project} from '@shared/interfaces';
import {StorageService} from '@shared/storage.service';
import {ProjectDot} from '@components/project-dot/project-dot.component';
import {ProjectFormDialogComponent} from '@components/time-entry-form-dialog/project-form-dialog.component';

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
    MatFabButton,
    MatMiniFabButton,
    ProjectDot
  ],
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent {
  private readonly dialog = inject(MatDialog);
  public readonly storageService = inject(StorageService);

  public readonly displayedColumns: string[] = ['name', 'colour', 'actions'];

  public openForm(project?: Project): void {
    const title: string = project ? 'Edit project' : 'New project';
    this.dialog.open(ProjectFormDialogComponent, {
      data: {
        title,
        project,
      },
    })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          if (project) {
            this.storageService.projects.update(list => list.map(p => p.id === project?.id ? {...p, ...result} : p));

          } else {
            this.storageService.projects.update(list => [...list, {
              ...result,
              id: crypto.randomUUID(),
            }]);
          }

          this.storageService.sync();
        }
      });
  }

  public remove(id: string): void {
    this.storageService.projects.update(list => list.filter(project => project.id !== id));
    this.storageService.entries.update(list => list.filter(entry => entry.projectId !== id));
    this.storageService.sync();
  }

}
