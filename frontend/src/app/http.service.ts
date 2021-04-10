import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MediaItem } from './app.config'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  

  constructor(private httpClient: HttpClient) { }

  getData(URL: any): Observable<any>{
    return this.httpClient.get<any>(URL)
  }
  
  getNowdaysData(URL: string): Observable<MediaItem[]>{
    return this.httpClient.get<MediaItem[]>(URL)
  }

  getMediaArray(URL: string): Observable<MediaItem[]>{
    return this.httpClient.get<MediaItem[]>(URL)
  }

  getDetail(URL: string): Observable<any>{
    return this.httpClient.get<any>(URL)
  }

  getVideo(URL: string): Observable<any>{
    return this.httpClient.get<any>(URL)
  }

  getCast(URL: string): Observable<any>{
    return this.httpClient.get<any>(URL)
  }

  getPerson(URL: string): Observable<any>{
    return this.httpClient.get<any>(URL)
  }
}
