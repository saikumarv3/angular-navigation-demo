import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageComponent } from './page/page.component';
import { AdvisorTermsComponent } from './advisor-terms/advisor-terms.component';
import { SuccessComponent } from './success/success.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'page/:title', component: PageComponent },
  { path: 'advisor-terms', component: AdvisorTermsComponent },
  { path: 'success', component: SuccessComponent },
  { path: '**', redirectTo: '' }
];
