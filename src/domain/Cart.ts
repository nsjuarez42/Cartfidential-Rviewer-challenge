import { CartItem } from "./CartItem";
import { ICart } from "./ICart";

class Cart implements ICart{
    id:string
    items: CartItem[];
  
    constructor(items:CartItem[],id:string){
        this.items=items
        this.id=id
    }
}

export{Cart}