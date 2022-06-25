import { product } from "./product";

export class device{
  _id!:string;
  characteristics!:string;
  islocked!:boolean;
  newcondittion!:number;
  goodcondittion!:number;
  poorcondittion!:number;
  faultycondittion!:number;
  productId!: product["_id"];
  updatedAt : Date;
}