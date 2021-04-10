import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { YouTubePlayerModule } from "@angular/youtube-player";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component'
import { NgbdTypeaheadHttp } from "./type-head/type-head.component"
import { HeroFormComponent } from './hero-form/hero-form.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselSectionComponent } from './carousel-section/carousel-section.component';
import { FooterComponent } from './footer/footer.component';
import { MylistPageComponent } from './mylist-page/mylist-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReviewsComponent } from './reviews/reviews.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    YouTubePlayerModule,
    FontAwesomeModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    HeroFormComponent,
    NgbdTypeaheadHttp,
    CarouselComponent,
    CarouselSectionComponent,
    FooterComponent,
    MylistPageComponent,
    HomePageComponent,
    DetailPageComponent,
    ReviewsComponent
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
