import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import '@material/web/button/filled-button.js';
import '@material/web/textfield/filled-text-field.js';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
