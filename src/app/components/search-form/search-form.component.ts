import { Component, EventEmitter, OnInit, Output, Inject, PLATFORM_ID } from '@angular/core'
import {VacanciesListService} from '../../shared/vacancies-list.service'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {MainService} from '../../pages/main/main.service'
import {NavigationExtras, Router} from '@angular/router'
import { isPlatformBrowser } from "@angular/common";

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

  constructor(private router: Router, private service: MainService, private vacanciesService: VacanciesListService,
              private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object) {
    this.form = this.fb.group({
      keyword: ['', [Validators.required, Validators.minLength(2)]],
      city: [-1, [Validators.required, selectValidator]]
    })
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.service.getCitiesDict().subscribe(data => this.cities = data)
    }
  }

  submitForm(): void {
    if (this.form.valid) {
      const {keyword, city: cityId} = this.form.value
      const queryParams: NavigationExtras = {
        queryParams: {keyword, cityId}
      }
      this.router.navigate(['vaclist'], queryParams)
    }
  }

}
