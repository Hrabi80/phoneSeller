import { user } from './user';
import { device } from './device';

export class Cart {
  constructor(
    public user: user,
    public devices: device[],
    public totalPrice: number
  ) { }
}
