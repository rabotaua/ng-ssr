import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VacancyService} from './vacancy.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.css']
})
export class VacancyComponent implements OnInit {
  vacData;
  constructor(private route: ActivatedRoute, private _location: Location, private vacancyService: VacancyService, private router: Router) {
  }

  formatDate(date: string) {
    const tmp = date.split('T');
    return `${tmp[0]} в ${tmp[1].slice(0, 5)}`;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.vacancyService.getVacancyData(params.id || 0)
        .subscribe(vacData => {
          if (!vacData) {
            this.router.navigate(['/main-page']);
          } else {
            this.vacData = vacData;
          }
        });
    });
  }

  goBack() {
    this._location.back();
  }

}
