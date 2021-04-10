import { Component, OnInit } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Category, Categories } from './app.config'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {
  public isMobile: boolean = false
  title = 'frontend';
  categories = Categories
  
  constructor(public breakpointObserver: BreakpointObserver) {}
  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 992px)'])
      .subscribe((state: BreakpointState) => {
        this.isMobile = !state.matches
        // if (!state.matches) {
        //   this.isMobile = true
        //   console.log(
        //     'screen size <= 992px'
        //   );
        // } else {
        //   this.isMobile = true
        // }
      });
  }
}
