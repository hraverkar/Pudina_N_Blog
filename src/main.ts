import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { SecurityContext, importProvidersFrom } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      ReactiveFormsModule,
      MarkdownModule.forRoot({ loader: HttpClient, sanitize: SecurityContext.NONE }),
      HttpClientModule,
    ),
  ]
})
  .catch((err) => console.error(err));
