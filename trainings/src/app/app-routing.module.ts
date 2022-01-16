import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trainings', loadChildren: () => import('./trainings/trainings.module').then(m => m.TrainingsModule) },
  { path: 'demo', loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
