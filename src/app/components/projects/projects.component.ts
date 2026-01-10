import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatInput} from '@angular/material/input';
import {MatFormField} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {Project} from '@shared/interfaces';
import {StorageService} from '@shared/storage.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  public readonly storageService = inject(StorageService);

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

  public removeProject(id: string): void {
    this.storageService.projects.update(list => list.filter(project => project.id !== id));
    this.storageService.entries.update(list => list.filter(entry => entry.projectId !== id));
    this.storageService.sync();
  }

}
