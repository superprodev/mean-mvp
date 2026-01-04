import { Routes } from '@angular/router';
import { Signin } from './pages/auth/signin/signin';
import { Signup } from './pages/auth/signup/signup';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "signin" },
    { path: "signin", component: Signin },
    { path: "signup", component: Signup },
    { path: "*", redirectTo: "signin" }
];
