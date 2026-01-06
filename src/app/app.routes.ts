import { Routes } from '@angular/router';
import { Signin } from './pages/auth/signin/signin';
import { Signup } from './pages/auth/signup/signup';
import { Dashboard } from './pages/dashboard/dashboard';
import { UserInfo } from './pages/auth/user-info/user-info';
import { Verify } from './pages/auth/verify/verify';
import { Chat } from './pages/dashboard/chat/chat';
import { UserList } from './pages/admin/user-list/user-list';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "dashboard" },
    { path: "admin/users", component: UserList },
    { path: "signin", component: Signin },
    { path: "signup", component: Signup },
    { path: "settings", component: UserInfo },
    { path: "verify-email", component: Verify },
    { path: "dashboard", component: Dashboard },
    { path: "chat", component: Chat },
    { path: "*", redirectTo: "dashboard" }
];
