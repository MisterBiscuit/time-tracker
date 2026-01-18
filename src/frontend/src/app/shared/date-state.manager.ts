import {computed, Injectable, signal} from '@angular/core';
import {fromLocalDateString} from '@shared/helpers';

@Injectable({ providedIn: 'root' })
export class DateStateManager {
  private _current = signal<Date>(new Date());

  public current = computed(() => this._current());
  public year = computed(() => this._current().getFullYear());
  public month = computed(() => this._current().getMonth());
  public date = computed(() => this._current().getDate());
  public label = computed(() => this._current().toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }));

  public previousDay(): void {
    const date = new Date(this._current());
    date.setDate(date.getDate() - 1);
    this._current.set(date);
  }

  public nextDay(): void {
    const date = new Date(this._current());
    date.setDate(date.getDate() + 1);
    this._current.set(date);
  }

  public previousWeek(): void {
    const date = new Date(this._current());
    date.setDate(date.getDate() - 7);
    this._current.set(date);
  }

  public nextWeek(): void {
    const date = new Date(this._current());
    date.setDate(date.getDate() + 7);
    this._current.set(date);
  }

  public previousMonth(): void {
    const date = new Date(this._current());
    date.setMonth(date.getMonth() - 1);
    this._current.set(date);
  }

  public nextMonth(): void {
    const date = new Date(this._current());
    date.setMonth(date.getMonth() + 1);
    this._current.set(date);
  }

  public set(date: string): void {
    this._current.set(fromLocalDateString(date));
  }

  public resetToCurrent(): void {
    this._current.set(new Date());
  }
}
