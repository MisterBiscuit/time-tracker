import {Component, Inject, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';

import {IconSelectorComponent} from '@components/icon-selector/icon-selector.component';
import {Project} from '@shared/interfaces';

@Component({
  selector: 'app-time-entry-form-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    IconSelectorComponent,
  ],
  templateUrl: './project-form-dialog.component.html',
})
export class ProjectFormDialogComponent {
  public readonly dialogRef = inject(MatDialogRef<ProjectFormDialogComponent>);

  public title: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; item: Project | undefined }) {
    this.title = data.title;
    if (data.item) {
      this.form.patchValue(data.item);
    }
  }

  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    colour: new FormControl(''),
  });

  public submit(): void {
    this.dialogRef.close(this.form.value);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
