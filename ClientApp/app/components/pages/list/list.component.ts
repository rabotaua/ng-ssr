import {Component, OnInit} from '@angular/core'
import {VacanciesListService} from '../../shared/vacancies-list.service'
import {Meta, Title} from '@angular/platform-browser'
import {ActivatedRoute, Params, Router} from '@angular/router'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  loading = false

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              public vacsService: VacanciesListService, title: Title, meta: Meta) {
    title.setTitle('Vacancies list page')
    meta.addTags([
      {
        name: 'author',
        content: 'Rabota.ua'
      },
      {
        name: 'keywords',
        content: 'vacancies, list, go to vacancy'
      },
      {
        name: 'description',
        content: 'This the the page where vacancies list is displayed'
      }
    ])
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const {keyword, cityId} = params;

      if (!keyword || !cityId) {
        this.router.navigate(['/404'])
        return;
      }

      this.loading = true;
      this.vacsService.getVacancies(keyword, cityId)
        .subscribe(data => {
          this.loading = false;
        });
    })
  }

}
