import {Injectable} from '@angular/core';
import {TimeEntry} from '@shared/interfaces';
import {AbstractApi} from '@shared/apis/abstract.api';

@Injectable({ providedIn: 'root' })
export class TimeEntryApi extends AbstractApi<TimeEntry> {

  protected readonly endpoint: string = '/time-entries';

}
