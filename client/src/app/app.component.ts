import { Component, OnInit } from '@angular/core';
declare const fb:any;
@Component({
  selector: 'll-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    //this.initFacebookService();
  }
  // private initFacebookService(): void {
  //   const initParams: InitParams = { xfbml:true, version:'v3.2'};
  //   this.facebookService.init(initParams);
  }
  // login() {
  //   fb.login()
  //     .then((res: any) => {
  //       console.log('Logged in', res);
  //     })
  //     .catch();
  // }

