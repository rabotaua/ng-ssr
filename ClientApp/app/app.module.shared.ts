import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/from';


import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/pages/main/main.component';
import { ListComponent } from './components/pages/list/list.component';
import { VacancyComponent } from './components/pages/vacancy/vacancy.component';
import {MainService} from './components/pages/main/main.service';
import {VacanciesListService} from './components/shared/vacancies-list.service';
import {VacancyService} from './components/pages/vacancy/vacancy.service';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { SearchFormComponent } from './components/components/search-form/search-form.component';



@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MainComponent,
        ListComponent,
        VacancyComponent,
        NotFoundComponent,
        SearchFormComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
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
        ])
    ],
    providers: [MainService, VacanciesListService, VacancyService]
})
export class AppModuleShared {
}
