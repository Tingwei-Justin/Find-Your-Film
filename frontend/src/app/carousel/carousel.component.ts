import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../http.service'
import { APP_URLS, MediaItem } from '../app.config'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})


export class CarouselComponent implements OnInit {
  @Input() isMobile:boolean = false;

  public imageData: MediaItem[] = [];
  public imageURLs: string[] = [];
  hovered = false;
  cur_id = -1;
  // paused = false;
  // unpauseOnArrow = false;
  // pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.fetchData()
  }

  fetchData() {
    let URL = APP_URLS.BACKEND_DOMAIN + APP_URLS.NOW_PLAYING_ROUTE
    this.httpService.getNowdaysData(URL).subscribe((res) => {
      this.imageData = res;
      this.imageURLs= res.map((item) => `${APP_URLS.IMAGE_DOMAIN}original${item.backdrop_path}`)
      console.log(this.imageURLs)
    })
  }

  // over(){
  //   console.log("Mouseover called");
  //   this.isHover = true;
  // }

  // out(){
  //   console.log("Mouseout called");
  //   this.isHover = false;
  // }
}
