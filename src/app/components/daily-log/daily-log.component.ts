import {AfterViewInit, Component, computed, effect, inject, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatOption} from '@angular/material/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {DurationInputComponent} from '@components/duration-input/duration-input.component';
import {CalendarService} from '@shared/calendar.service';
import {DateStateManager} from '@shared/date-state.manager';
import {DrawerStateManager} from '@shared/drawer-state.manager';
import {DurationPipe} from '@shared/duration.pipe';
import {sortByField, toLocalDateString} from '@shared/helpers';
import {TimeEntry} from '@shared/interfaces';
import {StorageService} from '@shared/storage.service';


@Component({
  selector: 'app-daily-log',
  standalone: true,
  imports: [
    MatCard,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatFormField,
    FormsModule,
    MatButton,
    MatInput,
    MatIcon,
    MatIconButton,
    DurationPipe,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    DurationInputComponent,
  ],
  providers: [DurationPipe],
  templateUrl: './daily-log.component.html',
  styleUrl: './daily-log.component.scss',
})
export class DailyLogComponent implements AfterViewInit {
  public readonly calendarService = inject(CalendarService);
  public readonly drawerStateManager = inject(DrawerStateManager);
  public readonly dateStateManager = inject(DateStateManager);
  public readonly durationPipe = inject(DurationPipe);
  public readonly storageService = inject(StorageService);

  @ViewChild('initialInput', { static: false }) initialInput!: MatSelect;

  public projectId: string | null = null;
  public workTypeId: string = 'dev';
  public minutes: number = 60;
  public comment: string = '';

  public projects = computed(() => this.storageService.projects().sort(sortByField('name')));
  public workTypes = computed(() => this.storageService.workTypes().sort(sortByField('label')));
  public displayDate = computed(() => this.dateStateManager.label());

  public entriesForDay = computed(() => this.storageService.entries()
    .filter(entry => entry.date === toLocalDateString(this.dateStateManager.current())));
  public remaining = computed(() => {
    const expected = this.calendarService.expectedMinutes(this.dateStateManager.current());
    const logged = this.entriesForDay().reduce((sum, entry) => sum + entry.minutes, 0);
    return expected - logged;
  });
  public loggable = computed(() => this.calendarService.isLoggable(this.dateStateManager.current()));
  public canAdd = computed(() => this.loggable() && this.remaining() > 0);

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

  constructor() {
    effect(() => {
      this.dateStateManager.current();
      this.comment = '';
      this.minutes = Math.min(this.remaining(), 60);
    });
  }

  public ngAfterViewInit(): void {
    queueMicrotask(() => {
      this.initialInput?.focus();
    });
  }

  public add(): void {
    if (!this.projectId || !this.workTypeId) {
      return;
    }
    const newEntry: TimeEntry = {
      id: crypto.randomUUID(),
      date: toLocalDateString(this.dateStateManager.current()),
      projectId: this.projectId,
      workTypeId: this.workTypeId,
      minutes: this.minutes,
      comment: this.comment,
    };
    this.storageService.entries.update(list => [...list, newEntry]);
    this.storageService.sync();
    this.comment = '';
  }
}
