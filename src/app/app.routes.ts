import { Routes } from '@angular/router';
import {CalendarPage} from './pages/calendar/calendar.page';
import {SettingsPage} from './pages/settings/settings.page';
import {SummaryPage} from './pages/summary/summary.page';

export const routes: Routes = [
  { path: 'calendar', component: CalendarPage },
  { path: 'summary', component: SummaryPage },
  { path: 'settings', component: SettingsPage },
  { path: '', redirectTo: 'calendar', pathMatch: 'full' },
];
