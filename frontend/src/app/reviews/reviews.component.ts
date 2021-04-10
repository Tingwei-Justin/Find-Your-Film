import { Component, OnInit, Input } from '@angular/core';
import { faStar} from '@fortawesome/free-solid-svg-icons';
import { HttpService } from '../http.service'
import { APP_URLS, MediaType } from '../app.config'



@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  @Input() media:MediaType = {type: 0, id: -1}

  public reviews: any;
  public isLoad:boolean = false;
  faStar = faStar
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    console.log(this.media)
    this.fetchReviews()
  }

  fetchReviews() {
    let URL = this.media.type == 0 ? APP_URLS.BACKEND_DOMAIN + APP_URLS.REVIEW_MOVIE_ROUTE + this.media.id
    : APP_URLS.BACKEND_DOMAIN + APP_URLS.REVIEW_TV_ROUTE + this.media.id
    this.httpService.getData(URL).subscribe((res) => {
      console.log(res)
      this.reviews = res
      this.isLoad = true;
    })
  }

  goToLink(url: string){
    console.log(url)
    window.open(url, '_blank');
  }

  getAvatarUrl(avatar_path: any) {
    if (avatar_path == null) {
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU"
    }

    if (avatar_path.includes("http")) {
      return avatar_path.substring(1);
    }
    return APP_URLS.IMAGE_DOMAIN + "/original" + avatar_path
  }
}
