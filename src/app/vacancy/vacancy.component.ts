import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VacancyService} from './vacancy.service';

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.css']
})
export class VacancyComponent implements OnInit {
  vacData;
  constructor(private route: ActivatedRoute, private vacancyService: VacancyService, private router: Router) {
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

}
