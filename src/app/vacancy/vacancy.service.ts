import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class VacancyService {

  constructor(private http: Http) { }

  getVacancyData(id: number) {
    return this.http.get('https://api.rabota.ua/vacancy', {
      params: { id }
    }).map(res => res.json());
  }

}
