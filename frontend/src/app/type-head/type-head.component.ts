import {Component, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of, OperatorFunction} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';
import {APP_URLS} from '../app.config'

interface Movie {
  name: string;
  original_title: string;
  backdrop_path: string;
  id: number;
  media_type: string;
}

const SEARCH_DOMAIN = APP_URLS.BACKEND_DOMAIN + APP_URLS.SEARCH_ROUTE;
const POSTER_DOMAIN = 'https://image.tmdb.org/t/p/w185';

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {}

  search(term: string) {
    if (term === '') {
      return of([]);
    }
    let SEARCH_URL = SEARCH_DOMAIN + term + "/7"
    return this.http
      .get<Movie[]>(SEARCH_URL).pipe(
        map(response => response.map(item => {
          let image_url = ""
          if (item.backdrop_path == null) {
            image_url = "assets/img/movie-placeholder.jpg"
          } else {
            image_url = POSTER_DOMAIN + item.backdrop_path
          }

          let data = {
            name: item.name || item.original_title,
            url: image_url,
            id: item.id,
            media_type: item.media_type
          }
          return data}))
    )
  }
}

@Component({
  selector: 'ngbd-typeahead-http',
  templateUrl: './type-head.component.html',
  providers: [SearchService],
  styleUrls:['./type-head.component.css']
})
export class NgbdTypeaheadHttp {
  model: any;
  searching = false;
  searchFailed = false;

  constructor(private _service: SearchService) {
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap(term =>
            this._service.search(term)
          ),
        )
    }

  formatter = (x: {name: string}) => x.name; 
   
}
