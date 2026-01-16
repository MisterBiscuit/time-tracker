import {Project, TimeEntry, TimeOff, WorkType} from '@shared/interfaces';
import {inject, Injectable} from '@angular/core';
import {StorageService} from '@shared/storage.service';

export interface AppExportV1 {
  version: 1;
  exportedAt: string;

  projects: Project[];
  workTypes: WorkType[];
  entries: TimeEntry[];
  timeOff: TimeOff[];
}

@Injectable({ providedIn: 'root' })
export class StorageFacadeService {
  private readonly storageService = inject(StorageService);

  public export(): AppExportV1 {
    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      projects: this.storageService.projects(),
      workTypes: this.storageService.workTypes(),
      entries: this.storageService.entries(),
      timeOff: this.storageService.timeOff(),
    };
  }

  public import(data: AppExportV1): void {
    this.storageService.projects.set(data.projects);
    this.storageService.workTypes.set(data.workTypes);
    this.storageService.entries.set(data.entries);
    this.storageService.timeOff.set(data.timeOff);
    this.storageService.sync();
  }
}

