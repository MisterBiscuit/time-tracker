import {Injectable} from '@angular/core';
import {WorkType} from '@shared/interfaces';
import {AbstractApi} from '@shared/apis/abstract.api';

@Injectable({ providedIn: 'root' })
export class WorkTypeApi extends AbstractApi<WorkType> {

  protected readonly endpoint: string = '/work-types';

}
