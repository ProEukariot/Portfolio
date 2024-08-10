import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

const hideLoadingScreen = () => {
  const loader = document.getElementsByClassName('bootstrap-screen')[0];
  loader.remove();
};

bootstrapApplication(AppComponent, appConfig)
  .then(() => hideLoadingScreen())
  .catch((err) => console.error(err));
