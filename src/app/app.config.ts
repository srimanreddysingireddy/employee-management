import { ApplicationConfig } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatNativeDateModule } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),                                  // Router configuration
    provideClientHydration(withEventReplay()),              // Client hydration with event replay
    MatNativeDateModule,                                     // Provide MatNativeDateModule for date adapter
    provideAnimationsAsync(),                                // Provide animations asynchronously
    HttpClientModule,                                        // Ensure HttpClientModule is available
  ]
};
