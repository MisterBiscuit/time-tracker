import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {UrlSettingsInterceptor} from '@shared/interceptors/url-settings.interceptor';
import {ProjectStore} from '@shared/stores/project.store';
import {WorkTypeStore} from '@shared/stores/work-type.store';
import {TimeEntryStore} from '@shared/stores/time-entry.store';
import {TimeOffStore} from '@shared/stores/time-off.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    { provide: HTTP_INTERCEPTORS, useClass: UrlSettingsInterceptor, multi: true },
    provideAppInitializer(() => {
      const projectStore = inject(ProjectStore);
      const timeEntryStore = inject(TimeEntryStore);
      const timeOffStore = inject(TimeOffStore);
      const workTypeStore = inject(WorkTypeStore);

      projectStore.load();
      timeEntryStore.load();
      timeOffStore.load();
      workTypeStore.load();
    }),
  ],
};
