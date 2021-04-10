import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  get(key: string): any {
    if (this.isLocalStorageSupported) {
      let item = this.localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item);
      }
    }
    return null;
  }
  
  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  addToList(key: string, value: any, limit: number = Number.MAX_SAFE_INTEGER) {

    this.removeFromList(key, value.id);
    let cacheList = this.get(key)
    if (cacheList === null) {
      cacheList = []
    }
    // for(var i in cacheList) {
    //   if (cacheList[i].id === value.id) {
    //     return;
    //   }
    // }
    cacheList.unshift(value);

    if (cacheList.length > limit) {
      cacheList = cacheList.pop()
    }

    this.localStorage.setItem(key, JSON.stringify(cacheList));  
  }

  getFromList(key: string, id: number): boolean {
    let cacheList = this.get(key)
    if (cacheList == null) {
      return false;
    }
    for(var i in cacheList) {
      if (cacheList[i].id === id) {
        return true;
      }
    }
    return false;
  }

  removeFromList(key: string, id: number): boolean {
    let cacheList = this.get(key)
    // console.log(cacheList)
    if (cacheList == null) {
      return false;
    }
    let index = -1
    for(var i = 0; i < cacheList.length; i++) {
      if (cacheList[i].id === id) {
        index = i;
        break;
      }
    }

    if (index > -1) {
      cacheList.splice(index, 1);
      this.localStorage.setItem(key, JSON.stringify(cacheList));  
      return true;
    }
    return false;
  }

  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      return true;
    }
    return false;
  }

  length(): number {
      return this.localStorage.length;
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }
}