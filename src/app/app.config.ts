import localeEs from '@angular/common/locales/es';
import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';

registerLocaleData(localeEs, 'es');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'es' },
    provideAnimations()
],
};
