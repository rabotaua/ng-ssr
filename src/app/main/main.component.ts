import {Component, OnInit} from '@angular/core'
import {MainService} from './main.service'
import {FormBuilder, FormControl, Validators} from '@angular/forms'
import {VacanciesListService} from '../shared/vacancies-list.service'
import {Route, Router} from '@angular/router'
import {Meta, Title} from '@angular/platform-browser'

const selectValidator = (control: FormControl) => {

  if (parseInt(control.value, 10) === -1 || isNaN(control.value)) {
    return {
      selectValidator: {
        valid: false
      }
    }
  }
  return null
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  cities;
  form;
  currentTime;

  constructor(private service: MainService, private fb: FormBuilder,
              private vacanciesService: VacanciesListService, private router: Router, meta: Meta, title: Title) {
    title.setTitle('Home page')
    meta.addTags([
      {
        name: 'author',
        content: 'Rabota.ua'
      },
      {
        name: 'keywords',
        content: 'key word, region, search'
      },
      {
        name: 'description',
        content: 'This the main page for searching job'
      }
    ])
  }

  ngOnInit() {
    this.currentTime = (new Date()).toString().split(' ');

    this.service.getCitiesDict().subscribe(data => this.cities = data)

    this.form = this.fb.group({
      keyword: ['', [Validators.required, Validators.minLength(2)]],
      city: [-1, [Validators.required, selectValidator]]
    })
  }

  submitForm() {
    if (this.form.valid) {
      this.vacanciesService.getVacancies(this.form.value.keyword, this.form.value.city)
        .subscribe(data => {
          if (data && data.total > 0) {
            this.router.navigate(['vaclist'])
          }
        })
    }
  }

}
