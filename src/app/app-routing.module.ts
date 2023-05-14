import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./shared/guards/auth.guard";

const routes: Routes = [
    {
        path: 'pipelines',
        loadChildren: () => import('./components/pipelines/pipelines-routing.module').then(m => m.PipelinesRoutingModule),
        canActivate: [AuthGuard]
    },
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: 'pipelines', pathMatch: 'full'},
    {path: '**', redirectTo: 'pipelines', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
