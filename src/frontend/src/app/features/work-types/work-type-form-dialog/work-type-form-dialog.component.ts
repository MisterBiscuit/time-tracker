import {Component, Inject, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {Project, WorkType} from '@shared/interfaces';
import {IconSelectorComponent} from '@components/icon-selector/icon-selector.component';

@Component({
  selector: 'app-work-type-form-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatDialogContent,
    MatDialogActions,
    IconSelectorComponent,
    MatDialogTitle,
  ],
  templateUrl: './work-type-form-dialog.component.html',
})
export class WorkTypeFormDialogComponent {
  public readonly dialogRef = inject(MatDialogRef<WorkTypeFormDialogComponent>);

  public title: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; item: WorkType | undefined }) {
    this.title = data.title;
    if (data.item) {
      this.form.patchValue(data.item);
    }
  }

  public form = new FormGroup({
    label: new FormControl('', Validators.required),
    symbol: new FormControl(''),
  });

  public submit(): void {
    this.dialogRef.close(this.form.value);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
