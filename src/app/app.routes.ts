import { Routes } from '@angular/router';
import { Signin } from './pages/auth/signin/signin';
import { Signup } from './pages/auth/signup/signup';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "dashboard" },
    { path: "signin", component: Signin },
    { path: "signup", component: Signup },
    { path: "dashboard", component: Dashboard },
    { path: "*", redirectTo: "dashboard" }
];
