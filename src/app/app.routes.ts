import {Routes} from '@angular/router';
import {CalendarPage} from './pages/calendar/calendar.page';
import {SummaryPage} from './pages/summary/summary.page';
import {ProjectsPage} from './pages/projects/projects.page';
import {WorkTypesPage} from './pages/work-types/work-types.page';

export const routes: Routes = [
  { path: 'calendar', component: CalendarPage },
  { path: 'summary', component: SummaryPage },
  { path: 'projects', component: ProjectsPage },
  { path: 'work-types', component: WorkTypesPage },
  { path: '', redirectTo: 'calendar', pathMatch: 'full' },
];
