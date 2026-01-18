import {Component, computed, Inject, inject} from '@angular/core';
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
import {MatOption, MatSelect} from '@angular/material/select';

import {DurationInputComponent} from '@components/duration-input/duration-input.component';
import {TimeEntry} from '@shared/interfaces';
import {CalendarService} from '@shared/calendar.service';
import {DateStateManager} from '@shared/date-state.manager';
import {DurationPipe} from '@shared/pipes/duration.pipe';
import {ProjectStore} from '@shared/stores/project.store';
import {WorkTypeStore} from '@shared/stores/work-type.store';
import {TimeEntryStore} from '@shared/stores/time-entry.store';
import {sortByField, toLocalDateString} from '@shared/helpers';

@Component({
  selector: 'app-time-entry-dialog',
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
    MatSelect,
    MatOption,
    DurationInputComponent,
  ],
  providers: [DurationPipe],
  templateUrl: './time-entry-form-dialog.component.html',
})
export class TimeEntryFormDialogComponent {
  public readonly dialogRef = inject(MatDialogRef<TimeEntryFormDialogComponent>);
  public readonly calendarService = inject(CalendarService);
  public readonly dateStateManager = inject(DateStateManager);
  public readonly durationPipe = inject(DurationPipe);
  private readonly projectStore = inject(ProjectStore);
  private readonly workTypeStore = inject(WorkTypeStore);
  private readonly timeEntryStore = inject(TimeEntryStore);

  public title: string;

  public projects = computed(() => this.projectStore.items().sort(sortByField('name')));
  public workTypes = computed(() => this.workTypeStore.items().sort(sortByField('label')));
  public displayDate = computed(() => this.dateStateManager.label());

  public entriesForDay = computed(() => this.timeEntryStore.items()
    .filter(entry => entry.date === toLocalDateString(this.dateStateManager.current())));
  public remaining = computed(() => {
    const expected = this.calendarService.expectedMinutes(this.dateStateManager.current());
    const logged = this.entriesForDay().reduce((sum, entry) => sum + entry.minutes, 0);
    return expected - logged;
  });
  public loggable = computed(() => this.calendarService.isLoggable(this.dateStateManager.current()));
  public canAdd = computed(() => this.loggable());

  public presets = computed(() => {
    const presets: { label: string; value: number }[] = [
      { label: '30m', value: 30 },
      { label: '1h', value: 60 },
      { label: '2h', value: 120 },
      { label: '4h', value: 240 },
    ];

    const remainingMinutes: number = this.remaining();
    if (remainingMinutes > 0) {
      const duration: string = this.durationPipe.transform(remainingMinutes, true);
      presets.push({ label: `Remaining (${duration})`, value: this.remaining() });
    }

    return presets;
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; item: TimeEntry | undefined }) {
    this.title = data.title;
    if (data.item) {
      this.form.patchValue(data.item);
    }
  }

  public form = new FormGroup({
    projectId: new FormControl('', Validators.required),
    workTypeId: new FormControl('', Validators.required),
    minutes: new FormControl(0, Validators.required),
    comment: new FormControl(''),
  });

  public submit(): void {
    const date: string = toLocalDateString(this.dateStateManager.current());
    this.dialogRef.close({ ...this.form.value, date });
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
