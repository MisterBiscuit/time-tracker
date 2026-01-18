import {inject, Injectable} from '@angular/core';
import {TimeOff} from '@shared/interfaces';
import {TimeOffStore} from '@shared/stores/time-off.store';

@Injectable({ providedIn: 'root' })
export class BankHolidayService {
  private readonly timeOffStore = inject(TimeOffStore);

  public async refresh(): Promise<void> {
    const year = new Date().getFullYear();
    const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/FR`);
    const data = await res.json();

    const mapped: TimeOff[] = data.map((holiday: { date: string; localName: string; }) => ({
      id: crypto.randomUUID(),
      date: holiday.date,
      label: holiday.localName,
    }));

    this.timeOffStore.items.set(mapped);
  }
}
