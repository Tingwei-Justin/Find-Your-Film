import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { faStar} from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faTwitter, faInstagram, faImdb} from '@fortawesome/free-brands-svg-icons';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { HttpService } from '../http.service'
import { LocalStorageService } from '../local-storage.service';
import {AppComponent} from "../app.component"
import { APP_URLS, Default, MediaItem, Category, Categories, Cast, MediaType } from '../app.config'



let apiLoaded = false;

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})

export class DetailPageComponent implements OnInit {
  public id: any;
  public isMovie = false;
  public isTV = false;
  public inWatchList= false;
  public videoKey:string = "";
  public item: any;
  public casts: Cast[] = [];
  public person: any;
  public curCacheData: any;
  
  
  public recommend: Category = {name: "default", api_url:"", cached: null}
  public similar: Category = {name: "default", api_url:"", cached: null}

  public media: MediaType = {type: -1, id: -1}

  //  alert component
  private _success = new Subject<string>();
  successMessage = '';
  public alertType = "success"

  faFacebook = faFacebookSquare;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faImdb = faImdb;
  faStar = faStar;
  isMobile = false;
  hashTags: string = "USC,CSCI571,FightOn"
  twitterShareDomain = "https://twitter.com/intent/tweet?"
  youtubeDomain = "https://www.youtube.com/watch?v="


  constructor(
    private route: ActivatedRoute, 
    private httpService: HttpService, 
    private modalService: NgbModal,
    private localStorageService: LocalStorageService,
    private appComponent: AppComponent) { 
  }

  @ViewChild("selfClosingAlert", { static: false }) selfClosingAlert: any;

  ngOnInit(): void {
    this.isMobile = this.appComponent.isMobile
    if (!apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      apiLoaded = true;
    }

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });


    this.id = this.route.snapshot.paramMap.get('id')
    let curRoute: string = this.route.routeConfig?.path || ""
    this.isMovie = curRoute?.includes("movie")
    this.isTV = curRoute?.includes("tv")
    this.recommend.name = this.isMovie ? "Recommended Movies" : "Recommended TV shows"
    this.recommend.api_url = this.isMovie ? APP_URLS.BACKEND_DOMAIN + APP_URLS.RECOMMEND_MOVIE_ROUTE + this.id
                                          : APP_URLS.BACKEND_DOMAIN + APP_URLS.RECOMMEND_TV_ROUTE + this.id
    
    this.similar.name = this.isMovie ? "Similar Movies" : "Similar TV shows"
    this.similar.api_url = this.isMovie ? APP_URLS.BACKEND_DOMAIN + APP_URLS.SIMILAR_MOVIE_ROUTE + this.id
                                          : APP_URLS.BACKEND_DOMAIN + APP_URLS.SIMILAR_TV_ROUTE + this.id
    
    this.media.type = this.isMovie ? 0 : 1;
    this.media.id = this.id

    this.fetchData()
    this.fetchVideoKey()
    this.fetchCast()

    console.log(this.recommend)
  }

  async fetchData() {
    let URL = this.isMovie ? `${APP_URLS.BACKEND_DOMAIN}${APP_URLS.DETAIL_MOVIE_ROUTE}/${this.id}`
                            : `${APP_URLS.BACKEND_DOMAIN}${APP_URLS.DETAIL_TV_ROUTE}/${this.id}`
    this.httpService.getDetail(URL).subscribe((res) => {
      console.log(res)
      let runtime = res.runtime || res.episode_run_time[0]
      let hours = Math.floor(runtime/60) > 0 ? `${Math.floor(runtime/60)}hrs` : ""
      let mins = Math.floor(runtime%60) > 0 ? `${Math.floor(runtime%60)}mins` : ""
      this.item = {
        name: this.isMovie ? res.title : res.name,
        tagline: res.tagline,
        year: this.isMovie ? res.release_date.slice(0, 4) : res.first_air_date.slice(0, 4),
        vote_average: res.vote_average,
        runtime: hours + mins,
        genres: this.arrayToString(res.genres.map((obj: MediaItem) => {return obj.name})),
        spoken_languages: this.arrayToString(res.spoken_languages.map((obj: MediaItem) => {return obj.english_name})),
        description: res.overview
      }

      let cacheData = {
        id: res.id,
        name: this.isMovie ? res.title : res.name,
        media_type: this.isMovie ? "movie" : "tv",
        poster_path: res.poster_path
      }
      this.curCacheData = cacheData
      this.localStorageService.addToList(Default.WATCHED, cacheData, 24)
      this.inWatchList = this.localStorageService.getFromList(Default.WATCH_LIST, res.id)
      // console.log(this.item)
      // this.preprocessData()
    })
  }

  async fetchVideoKey() {
    let URL = this.isMovie ? `${APP_URLS.BACKEND_DOMAIN}${APP_URLS.VIDEO_MOVIE_ROUTE}/${this.id}`
                            : `${APP_URLS.BACKEND_DOMAIN}${APP_URLS.VIDEO_TV_ROUTE}/${this.id}`
    this.httpService.getVideo(URL).subscribe((res) => {
      // console.log(res)
      this.videoKey = res.key || "tzkWB85ULJY";
      console.log(this.videoKey)
    })
  }


  async fetchCast() {
    let URL = this.isMovie ? `${APP_URLS.BACKEND_DOMAIN}${APP_URLS.CAST_MOVIE_ROUTE}/${this.id}`
                            : `${APP_URLS.BACKEND_DOMAIN}${APP_URLS.CAST_TV_ROUTE}/${this.id}`
    this.httpService.getCast(URL).subscribe((res) => {
      res = res.filter(function(item: any) {
        return item.profile_path != null
      })
      for(var i in res) {
        res[i].profile_path = APP_URLS.IMAGE_DOMAIN +  "w500" + res[i].profile_path 
      }
      this.casts = res
    })
  }

  async fetchPerson(person_id: number) {
    this.person = null;
    let URL = `${APP_URLS.BACKEND_DOMAIN}${APP_URLS.CAST_DETAIL_ROUTE}${person_id}`
    this.httpService.getPerson(URL).subscribe((res) => {
      res.profile_path = APP_URLS.IMAGE_DOMAIN +  "w500" + res.profile_path;
      res.gender = res.gender == 1 ? "Female" : "Male";
      this.person = res;
      this.fetchPersonSocialMedia(person_id);
      console.log(this.person)
    })
  }

  async fetchPersonSocialMedia(person_id: number) {
    let URL = `${APP_URLS.BACKEND_DOMAIN}${APP_URLS.CAST_DETAIL_ROUTE}${person_id}/external_ids`
    this.httpService.getPerson(URL).subscribe((res) => {
      // console.log(res);
      this.person.facebook = res.facebook_id ? "https://www.facebook.com/" + res.facebook_id : null
      this.person.instagram = res.instagram_id ? "https://www.instagram.com/" + res.instagram_id : null
      this.person.imdb = res.imdb_id ? "https://www.imdb.com/name/" + res.imdb_id : null
      this.person.twitter = res.twitter_id ? "https://www.twitter.com/" + res.twitter_id : null
    })
  }

  arrayToString(strArray: string[]): string {
    let result: string = ""
    for(var i in strArray) {
      result += strArray[i] + ","
    }
    if(result.length === 0) {
      return ""
    }
    return result.slice(0,-1);
  }

  openLg(content: any, id: number) {
    // console.log(id)
    this.modalService.open(content, { size: 'lg' });
    this.fetchPerson(id)
  }

  goToLink(url: string){
    // console.log(url)
    window.open(url, '_blank');
  }

  persist(key: string, value: any) {
    this.localStorageService.set(key, value);
  }

  addToWatchlist() {
    console.log("add movie to watch list")
    this.localStorageService.addToList(Default.WATCH_LIST, this.curCacheData)
    this.inWatchList = true;
    this.alertType = "success"
    this._success.next("Added to watchlist");
  }

  removeFromWatchlist() {
    console.log("remove movie from watch list")
    this.localStorageService.removeFromList(Default.WATCH_LIST, this.curCacheData.id)
    this.inWatchList = false;
    this.alertType = "danger"
    this._success.next("Removed from watchlist");
  }

  encodeString(input: string) {
    return encodeURIComponent(input)
  }
}
