import { product } from "./product";

export class device{
  _id!:string;
  characteristics!:string;
  islocked!:boolean;
  newcondition!:number;
  goodcondition!:number;
  poorcondition!:number;
  faultycondition!:number;
  productId!: product["_id"];
  updatedAt : Date;
}