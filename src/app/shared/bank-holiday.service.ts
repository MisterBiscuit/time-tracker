import {inject, Injectable} from '@angular/core';
import {TimeOff} from '@shared/interfaces';
import {StorageService} from '@shared/storage.service';

@Injectable({ providedIn: 'root' })
export class BankHolidayService {
  private readonly storageService = inject(StorageService);

  public async refresh(): Promise<void> {
    const year = new Date().getFullYear();
    const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/FR`);
    const data = await res.json();

    const mapped: TimeOff[] = data.map((holiday: { date: string; localName: string; }) => ({
      id: crypto.randomUUID(),
      date: holiday.date,
      label: holiday.localName,
    }));

    this.storageService.timeOff.set(mapped);
    this.storageService.sync();
  }
}
