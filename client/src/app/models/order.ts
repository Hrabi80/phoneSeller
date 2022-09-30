import { user } from './user';
import { device } from './device';

export class order{
  _id!:string;
  status! : string;
  paymentMethod! : string;
  paymentAdress! : string;
  meeting!: string;
  firstname!: string;
  lastname!:string;
  phone! : string;
  street! : string;
  city!:string;
  state!:string;
  username!:string;
  zip!:string;
  subTotal!: number;
  owner!: string;
  items!:[{
    price :number;
    condition:string;
    name:string;
    photo:string;
    characteristics:string;
    deviceId:string
  }]
}