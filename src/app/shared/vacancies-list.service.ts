import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class VacanciesListService {
  vacanciesList;
  constructor(private http: Http) { }

  getVacancies(keyWords: string, cityId: string) {
    return this.http.post('https://api.rabota.ua/vacancy/search', {
      cityId, keyWords
    }).map(res => res.json()).map(data => {
      this.vacanciesList = data;
      return data;
    });
  }

}
