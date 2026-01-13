import {Component, computed, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {CalendarService} from '@shared/calendar.service';
import {DateStateManager} from '@shared/date-state.manager';
import {DurationPipe} from '@shared/duration.pipe';
import {sortByField, toLocalDateString} from '@shared/helpers';
import {StorageService} from '@shared/storage.service';
import {ProjectDot} from '@components/project-dot/project-dot.component';

@Component({
  selector: 'app-logged-time-list',
  standalone: true,
  imports: [
    DurationPipe,
    MatIcon,
    MatIconButton,
    ProjectDot
  ],
  templateUrl: './logged-time-list.component.html',
})
export class LoggedTimeListComponent {
  public readonly dateStateManager = inject(DateStateManager);
  public readonly storageService = inject(StorageService);

  public entriesForDay = computed(() => this.storageService.entries()
    .filter(entry => entry.date === toLocalDateString(this.dateStateManager.current())));

  public remove(id: string): void {
    this.storageService.entries.update(list => list.filter(entry => entry.id !== id));
    this.storageService.sync();
  }

  public projectColour(id: string): string {
    return this.storageService.projects().find(project => project.id === id)?.colour ?? '#999';
  }

  public projectName(id: string): string {
    return this.storageService.projects().find(project => project.id === id)?.name ?? 'Unknown project';
  }

  public workTypeLabel(id: string): string | undefined {
    return this.storageService.workTypes().find(workType => workType.id === id)?.label ?? 'Unknown label';
  }

  public workTypeSymbol(id: string): string | undefined {
    return this.storageService.workTypes().find(workType => workType.id === id)?.symbol ?? id;
  }
}
