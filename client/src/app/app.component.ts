import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';
declare const fb:any;
@Component({
  selector: 'll-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private facebookService: FacebookService) {}
  ngOnInit(): void {
    this.initFacebookService();
  }
  private initFacebookService(): void {
    const initParams: InitParams = { xfbml:true, version:'v3.2'};
    this.facebookService.init(initParams);
  }
  login() {
    fb.login()
      .then((res: any) => {
        console.log('Logged in', res);
      })
      .catch();
  }
}
