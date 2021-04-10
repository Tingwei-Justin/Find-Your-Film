import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MylistPageComponent } from './mylist-page/mylist-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'mylist', component: MylistPageComponent},
  {
    path: 'watch', 
    children:[
      {path: 'movie/:id', component: DetailPageComponent},
      {path: 'tv/:id', component: DetailPageComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
