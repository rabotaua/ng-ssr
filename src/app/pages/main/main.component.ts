import {Component, OnInit} from '@angular/core'
import {MainService} from './main.service'
import {FormBuilder, FormControl, Validators} from '@angular/forms'
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
  cities
  form
  total
  currentTime

  constructor(private service: MainService, private fb: FormBuilder, meta: Meta, title: Title) {
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
    this.currentTime = (new Date).toString().split(' ')
    this.service.getCitiesDict().subscribe(data => this.cities = data)

    this.form = this.fb.group({
      keyword: ['', [Validators.required, Validators.minLength(2)]],
      city: [-1, [Validators.required, selectValidator]]
    })
  }
}
