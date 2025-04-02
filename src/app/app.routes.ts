import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageComponent } from './page/page.component';
import { SuccessComponent } from './success/success.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'page/:title', component: PageComponent },
  { path: 'success', component: SuccessComponent }
];
