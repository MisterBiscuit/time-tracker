import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {WorkTypeListComponent} from '@components/work-type-list/work-type-list.component';

@Component({
  selector: 'app-work-types',
  standalone: true,
  imports: [
    FormsModule,
    WorkTypeListComponent,
    WorkTypeListComponent,
  ],
  templateUrl: './work-types.page.html',
})
export class WorkTypesPage {
}
