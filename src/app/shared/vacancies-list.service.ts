import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class VacanciesListService {
  vacanciesList = []
  total = 0
  constructor(private http: Http) { }

  getVacancies(keyWords: string, cityId: string) {
    return this.http.post('https://api.rabota.ua/vacancy/search', {
      cityId, keyWords
    }).map(res => res.json()).map(data => {
      this.vacanciesList = data;
      this.total = data.total
      return data;
    });
  }

}
