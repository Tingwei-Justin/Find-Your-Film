import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Categories, Category, Default} from '../app.config'
import {AppComponent} from "../app.component"

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  categories = Categories
  cachedCategory: any;
  isMobile: boolean = false;
  constructor( private localStorageService: LocalStorageService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.isMobile = this.appComponent.isMobile
    let cachedCategory: Category = {
      name: "Continue Watching",
      api_url: "",
      cached: this.localStorageService.get(Default.WATCHED)
    }
    this.cachedCategory = cachedCategory
    console.log(cachedCategory)
  }

}
