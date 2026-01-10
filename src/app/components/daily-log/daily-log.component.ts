import {AfterViewInit, Component, computed, effect, inject, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatOption} from '@angular/material/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {StorageService} from '@shared/storage.service';
import {CalendarService} from '@shared/calendar.service';
import {TimeEntry} from '@shared/interfaces';
import {DrawerStateManager} from '@shared/drawer-state.manager';
import {DurationPipe} from '@shared/duration.pipe';
import {sortByField, toLocalDateString} from '@shared/helpers';
import {DateStateManager} from '@shared/date-state.manager';

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
  ],
  templateUrl: './daily-log.component.html',
  styleUrl: './daily-log.component.scss',
})
export class DailyLogComponent implements AfterViewInit {
  public readonly calendarService = inject(CalendarService);
  public readonly drawerStateManager = inject(DrawerStateManager);
  public readonly dateStateManager = inject(DateStateManager);
  public readonly storageService = inject(StorageService);

  @ViewChild('projectInput') projectInput!: MatSelect;

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

  constructor() {
    effect(() => {
      this.dateStateManager.current();
      this.comment = '';
      this.minutes = Math.min(this.remaining(), 60);
    });
  }

  public ngAfterViewInit(): void {
    setTimeout(() => this.projectInput?.focus());
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

  public remove(id: string): void {
    this.storageService.entries.update(list => list.filter(entry => entry.id !== id));
    this.storageService.sync();
  }

  public projectColour(id: string): string | undefined {
    return this.storageService.projects().find(project => project.id === id)?.colour ?? '#999';
  }

  public workTypeLabel(id: string): string | undefined {
    return this.storageService.workTypes().find(workType => workType.id === id)?.label ?? id;
  }

  public workTypeSymbol(id: string): string | undefined {
    return this.storageService.workTypes().find(workType => workType.id === id)?.symbol ?? id;
  }
}
