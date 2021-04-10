import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() footerText:string = "Powerd by TMDB. Developed by Tingwei Zhou"
  constructor() { }

  ngOnInit(): void {
  }

}
