import { ICartItem } from "./ICartItem";

class CartItem implements ICartItem{
    id: string;
    name: string;
    quantity: number;
    price: number;

    constructor(id:string,name:string,quantity:number,price:number){
        this.id =id
        this.name=name
        this.quantity=quantity
        this.price=price
    }

}

export{CartItem}