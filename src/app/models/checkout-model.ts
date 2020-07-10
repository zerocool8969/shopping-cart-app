import { CartDto } from './cart-model';

export class CheckOutDto{
    id:string;
    zipcode:string;
    mobile:string;
    address:string;
    cart: CartDto[] = [];
    userId: number;
}