import {inject, Injectable} from '@angular/core';

import {WorkTypeFormDialogComponent} from '@features/work-types/work-type-form-dialog/work-type-form-dialog.component';
import {WorkTypeApi} from '@shared/apis/work-type.api';
import {WorkType} from '@shared/interfaces';
import {AbstractStore} from '@shared/stores/abstract.store';

@Injectable({ providedIn: 'root' })
export class WorkTypeStore extends AbstractStore<WorkType> {
  protected readonly api = inject(WorkTypeApi);
  protected readonly itemLabel = 'Work type';
  protected readonly dialogComponent = WorkTypeFormDialogComponent;
}
