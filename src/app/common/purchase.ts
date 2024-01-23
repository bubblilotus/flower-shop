import { Address } from './address';
import { Customer } from './customer';
import { Order } from './order';
import { OrderItem } from './order-item';
import { Recipient } from './recipient';

export class Purchase {
    customer!: Customer;
    recipient!: Recipient;
    shippingAddress!: Address;
    billingAddress!: Address;
    order!: Order;
    orderItems!: OrderItem[]; 
}
