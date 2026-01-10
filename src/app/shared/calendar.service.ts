import {inject, Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {toLocalDateString} from './helpers';

@Injectable({ providedIn: 'root' })
export class CalendarService {
  private readonly storageService = inject(StorageService);

  public expectedMinutes(date: Date): number {
    const iso = toLocalDateString(date);
    const override = this.storageService.overrides().find(o => o.date === iso);
    if (override) {
      return override.minutes;
    }
    const day = date.getDay();
    if ([0, 6].includes(day)) {
      return 0;
    }
    return day === 5 ? 60 * 7 : 60 * 8;
  }

  public isLoggable(date: Date): boolean {
    const day = date.getDay();
    if (day === 0 || day === 6) {
      return false;
    }

    const iso = toLocalDateString(date);
    return !this.storageService.timeOff().some(t => t.date === iso);
  }
}
