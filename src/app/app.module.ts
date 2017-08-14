import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { ListComponent } from './pages/list/list.component';
import { VacancyComponent } from './pages/vacancy/vacancy.component';
import './rxjs-imports';
import {MainService} from './pages/main/main.service';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';
import {VacanciesListService} from './shared/vacancies-list.service';
import {VacancyService} from './pages/vacancy/vacancy.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SearchFormComponent } from './components/search-form/search-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ListComponent,
    VacancyComponent,
    NotFoundComponent,
    SearchFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-ssr'}),
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [MainService, VacanciesListService, VacancyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
