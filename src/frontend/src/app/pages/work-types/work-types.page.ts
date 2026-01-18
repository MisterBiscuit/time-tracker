import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

import {WorkTypeListComponent} from '@features/work-types/work-type-list/work-type-list.component';
import {WorkTypeStore} from '@shared/stores/work-type.store';

@Component({
  selector: 'app-work-types',
  standalone: true,
  imports: [
    FormsModule,
    WorkTypeListComponent,
    WorkTypeListComponent,
    MatButton,
  ],
  templateUrl: './work-types.page.html',
})
export class WorkTypesPage {
  public workTypeStore = inject(WorkTypeStore);

  public openForm(): void {
    this.workTypeStore.openForm();
  }
}
