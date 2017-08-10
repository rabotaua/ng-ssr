import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ListComponent } from './list/list.component';
import { VacancyComponent } from './vacancy/vacancy.component';
import './rxjs-imports';
import {MainService} from './main/main.service';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';
import {VacanciesListService} from './shared/vacancies-list.service';
import {VacancyService} from './vacancy/vacancy.service';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ListComponent,
    VacancyComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [MainService, VacanciesListService, VacancyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
