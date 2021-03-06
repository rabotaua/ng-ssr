import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {MainComponent} from './pages/main/main.component';
import {ListComponent} from './pages/list/list.component';
import {VacancyComponent} from './pages/vacancy/vacancy.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main-page'
  },
  {
    path: 'main-page',
    component: MainComponent
  },
  {
    path: 'vaclist',
    component: ListComponent
  },
  {
    path: 'vacancy/:id',
    component: VacancyComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
