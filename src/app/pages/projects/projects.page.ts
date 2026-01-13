import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProjectListComponent} from '@components/project-list/project-list.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    FormsModule,
    ProjectListComponent,

  ],
  templateUrl: './projects.page.html',
})
export class ProjectsPage {
}
