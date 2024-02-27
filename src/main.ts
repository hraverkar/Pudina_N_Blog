import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { SecurityContext, importProvidersFrom } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonModule } from '@angular/common';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      ReactiveFormsModule,
      MarkdownModule.forRoot({
        loader: HttpClient,
        sanitize: SecurityContext.NONE,
      }),
      HttpClientModule,
      CommonModule
    ),
  ],
}).catch((err) => console.error(err));
