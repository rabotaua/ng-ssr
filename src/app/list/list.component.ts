import { Component, OnInit } from '@angular/core';
import {VacanciesListService} from '../shared/vacancies-list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  loading = false;
  constructor(public vacsService: VacanciesListService) { }

  ngOnInit() {
    if(!this.vacsService.vacanciesList) {
      this.loading = true
      this.vacsService.getVacancies('', '0').subscribe(
        () => {
          this.loading = false;
        }
      );
    }
  }

}
