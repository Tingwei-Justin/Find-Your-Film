import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import {Default, APP_URLS} from '../app.config'
import {AppComponent} from "../app.component"

@Component({
  selector: 'app-mylist-page',
  templateUrl: './mylist-page.component.html',
  styleUrls: ['./mylist-page.component.css']
})
export class MylistPageComponent implements OnInit {
  watchList: any
  isMobile: any
  hovered: boolean = false
  cur_id = -1;
  constructor(private localStorageService: LocalStorageService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.isMobile = this.appComponent.isMobile
    console.log(this.isMobile)
    this.fetchData()
  }

  async fetchData() {
    let watchList = this.localStorageService.get(Default.WATCH_LIST)
    for(var i in watchList) {
      watchList[i].poster_path = APP_URLS.IMAGE_DOMAIN +  "w500" + watchList[i].poster_path 
    }
    this.watchList = watchList
    console.log(this.watchList)
  }
}
