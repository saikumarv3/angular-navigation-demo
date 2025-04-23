import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageComponent } from './page/page.component';
import { SuccessComponent } from './success/success.component';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'page/:title', component: PageComponent },
  { path: 'page/:title/prefill', component: PageComponent },
  { path: 'success', component: SuccessComponent }
];
