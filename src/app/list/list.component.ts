import {Component, OnInit} from '@angular/core'
import {VacanciesListService} from '../shared/vacancies-list.service'
import {Meta, Title} from '@angular/platform-browser'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  loading = false

  constructor(public vacsService: VacanciesListService, title: Title, meta: Meta) {
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
    if (!this.vacsService.vacanciesList) {
      this.loading = true
      this.vacsService.getVacancies('', '0').subscribe(
        () => {
          this.loading = false
        }
      )
    }
  }

}
