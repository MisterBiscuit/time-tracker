import {Injectable, signal} from '@angular/core';
import {DayOverride, Project, TimeEntry, TimeOff, WorkType} from './interfaces';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private load<T>(key: string, fallback: T): T {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  }

  private save<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public projects = signal<Project[]>(this.load('projects', []));
  public workTypes = signal<WorkType[]>(this.load('workTypes', []));
  public entries = signal<TimeEntry[]>(this.load('entries', []));
  public overrides = signal<DayOverride[]>(this.load('overrides', []));
  public timeOff = signal<TimeOff[]>(this.load('timeOff', []));

  public sync(): void {
    this.save('projects', this.projects());
    this.save('workTypes', this.workTypes());
    this.save('entries', this.entries());
    this.save('overrides', this.overrides());
    this.save('timeOff', this.timeOff());
  }
}
