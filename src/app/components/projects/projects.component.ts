import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatFormField} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {Project} from '@shared/interfaces';
import {StorageService} from '@shared/storage.service';
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
import {SplitComponent, SplitLeftComponent, SplitRightComponent} from '@components/split/split.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
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
    SplitComponent,
    SplitLeftComponent,
    SplitRightComponent
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  public readonly storageService = inject(StorageService);

  public readonly displayedColumns: string[] = ['name', 'colour', 'actions'];

  public projectName: string = '';
  public projectColour: string = '';

  public addProject(): void {
    if (!this.projectName) {
      return;
    }

    const newProject: Project = {
      id: crypto.randomUUID(),
      name: this.projectName,
      colour: this.projectColour,
    };
    this.storageService.projects.update(list => [...list, newProject]);
    this.storageService.sync();
    this.projectName = '';
    this.projectColour = '';
  }

  public remove(id: string): void {
    this.storageService.projects.update(list => list.filter(project => project.id !== id));
    this.storageService.entries.update(list => list.filter(entry => entry.projectId !== id));
    this.storageService.sync();
  }

}
