import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';

declare const fb:any;
@Component({
  selector: 'll-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //chatbox = document.getElementById('fb-customer-chat');
  @ViewChild('fbcustomerchat', { static: false }) public mydiv: ElementRef;
  constructor(private facebookService: FacebookService) {}
  ngOnInit(): void {
    this.initFacebookService();
   // this.mydiv.attr('attr-name', 'attr-value');

  }
  private initFacebookService(): void {
    const initParams: InitParams = { xfbml:true, version:'v14.0'};
    this.facebookService.init(initParams);
  }
  }

  //var chatbox = document.getElementById('fb-customer-chat');
  //chatbox.setAttribute("page_id", "102160995767186");
  //chatbox.setAttribute("attribution", "biz_inbox");
  // login() {
  //   fb.login()
  //     .then((res: any) => {
  //       console.log('Logged in', res);
  //     })
  //     .catch();
  // }

