import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service'
import { APP_URLS, MediaItem, Category, Categories } from '../app.config'

@Component({
  selector: 'app-carousel-section',
  templateUrl: './carousel-section.component.html',
  styleUrls: ['./carousel-section.component.css']
})

export class CarouselSectionComponent implements OnInit {
  // @Input() title:string = "Default Title"
  @Input() category:Category = {name: "default", api_url:"", cached: null}
  @Input() isMobile:boolean = false;
  
  public totalData: MediaItem[] = [];
  public imageURLs: string[] = [];
  public itemsFormatted: MediaItem[][] = [];
  public isHover = false;
  public type: string = "";
  hovered = false;
  cur_id = -1;
  pauseOnHover = true;
  pauseOnFocus = true;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    if (this.category.api_url != "") {
      this.type = this.category.api_url.includes("/movies/") ? "movie" : "tv"
      this.fetchData()
      console.log(this.category.api_url)
    } else {
      this.totalData = this.category.cached
      this.preprocessData()
    }
  }

  async fetchData() {
    let URL = this.category.api_url;//APP_URLS.BACKEND_DOMAIN + APP_URLS.POPULAR_MOVIE_ROUTE
    this.httpService.getMediaArray(URL).subscribe((res) => {
      this.totalData = res;
      console.log(res)
      this.preprocessData()
    })
  }

  async preprocessData() {
    let j = -1;
    for (let i = 0; i < this.totalData.length; i++) {
      if (i % 6 == 0) {
          j++;
          this.itemsFormatted[j] = [];
      }
      this.totalData[i].poster_path = this.totalData[i].poster_path != null 
                                          ? `${APP_URLS.IMAGE_DOMAIN}w500${this.totalData[i].poster_path}` 
                                          : "assets/img/post-placeholder.png"
      this.totalData[i].media_type =  this.totalData[i].media_type || this.type
      this.itemsFormatted[j].push(this.totalData[i]);
    }
  }
}
