import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MainService {
  constructor(private http: Http) {
  }

  getCitiesDict() {
    return this.http.get('https://api.rabota.ua/dictionary/city')
      .map(response => response.json())
  }
}
