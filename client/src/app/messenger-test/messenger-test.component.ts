import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-messenger-test',
  templateUrl: './messenger-test.component.html',
  styleUrls: ['./messenger-test.component.scss']
})
export class MessengerTestComponent implements OnInit {

  constructor(private facebookService: FacebookService,
             private fbService : OrderService) { }

  ngOnInit(): void {
    this.initFacebookService();
  }
  private initFacebookService(): void {
    const initParams: InitParams = { appId: '102160995767186',xfbml:true, version:'v3.2'};
    this.facebookService.init(initParams);
  }
 

}
