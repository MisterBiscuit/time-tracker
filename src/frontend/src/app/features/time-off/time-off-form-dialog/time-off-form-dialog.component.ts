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
import {TimeOff} from '@shared/interfaces';

@Component({
  selector: 'app-time-off-form-dialog',
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
  ],
  templateUrl: './time-off-form-dialog.component.html',
})
export class TimeOffFormDialogComponent {
  public readonly dialogRef = inject(MatDialogRef<TimeOffFormDialogComponent>);

  public title: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; item: TimeOff | undefined }) {
    this.title = data.title;
    if (data.item) {
      this.form.patchValue(data.item);
    }
  }

  public form = new FormGroup({
    date: new FormControl('', Validators.required),
    label: new FormControl(''),
  });

  public submit(): void {
    this.dialogRef.close(this.form.value);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
