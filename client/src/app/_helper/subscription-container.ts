import { Subscription } from "rxjs";

export class SubscriptionContainer{
  private subs =[];
  
  set add(s:Subscription){
    this.subs.push(s);
    console.log("after sub=======>", this.subs);
  }

  dispose(){
    this.subs.forEach(s=>s.unsubscribe());
    console.log("after dsipose =======>", this.subs);
  }
}