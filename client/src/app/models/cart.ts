import { user } from './user';
import { device } from './device';

export class Cart {
  constructor(
    public owner: user,
    public items: device[],
    public totalPrice: number,
    public subTotal: number
  ) { }
}
