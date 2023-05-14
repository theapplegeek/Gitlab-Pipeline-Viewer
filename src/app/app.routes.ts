import {Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./shared/auth/auth.guard";

export const routes: Routes = [
    {
        path: 'pipelines',
        loadChildren: () => import('./components/pipelines/pipelines.routes').then(m => m.routes),
        canActivate: [AuthGuard]
    },
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: 'pipelines', pathMatch: 'full'},
    {path: '**', redirectTo: 'pipelines', pathMatch: 'full'},
];
