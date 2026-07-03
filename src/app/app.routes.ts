import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];