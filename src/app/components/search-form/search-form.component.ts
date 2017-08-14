import {Component, EventEmitter, OnInit, Output} from '@angular/core'
import {VacanciesListService} from '../../shared/vacancies-list.service'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {MainService} from '../../pages/main/main.service'
import {Observable} from 'rxjs/Observable'

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
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  public form: FormGroup
  public cities: Array<any>

  @Output() vacancies: EventEmitter<any> = new EventEmitter<any>()

  constructor(private service: MainService, private vacanciesService: VacanciesListService, private fb: FormBuilder) {
    this.form = this.fb.group({
      keyword: ['', [Validators.required, Validators.minLength(2)]],
      city: [-1, [Validators.required, selectValidator]]
    })
  }

  ngOnInit() {
    this.service.getCitiesDict().subscribe(data => this.cities = data)
  }

  submitForm(): void {
    if (this.form.valid) {
      this.vacanciesService.getVacancies(this.form.value.keyword, this.form.value.city)
        .subscribe(data => {
          this.vacancies.emit(data)
        })
    }
  }

}
