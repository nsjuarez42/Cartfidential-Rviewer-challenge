import {Block} from '../domain/Block'
import {Blockchain} from '../domain/Blockchain'
import { Cart } from "../domain/Cart";
import { CartItem } from "../domain/CartItem";
import { Fsdatabase } from '../model/fsDatabase'

function getCartByIdService(id:string) : Cart | undefined{

    let data = Fsdatabase.readDb()

    if(Object.keys(data).length==0){
        const blockchain = new Blockchain();
        Fsdatabase.writeDb(blockchain)
        return undefined
    }

    data = new Blockchain(data.blockchain)

    console.log(data)

    for(let i=0;i<data.blockchain.length;i++){
        if(data.blockchain[i].data.id == id){
         return data.blockchain[i].data
        }
    }

    return undefined

}

function postCartByIdService(id:string,items:CartItem[]) : Cart | undefined{
    let data = Fsdatabase.readDb()

    if(Object.keys(data).length ==0){
        const blockchain = new Blockchain()
        Fsdatabase.writeDb(blockchain)
        data = new Blockchain(blockchain.blockchain)
    }

    for(let i=0;i<data.blockchain.length;i++){
      if(data.blockchain[i].data.id == id){
          return undefined
      }
    }

    const cart = new Cart(items,id)

    const block = new Block(Date.now(),data.blockchain[data.blockchain.length-1].hash,cart,undefined,undefined)

    data.addBlock(block)

    Fsdatabase.writeDb(data)

    return cart
     
}

function patchCartByIdService(id:string,items:CartItem[]) : Cart | undefined{
    let data = Fsdatabase.readDb();

    if(Object.keys(data).length ==0){
        const blockchain = new Blockchain()
        Fsdatabase.writeDb(blockchain)
        data = new Blockchain(blockchain.blockchain)
    }

    let i=0
    var cartFound =false
    while(i<data.blockchain.length && !cartFound){
      if(data.blockchain[i].data.id == id){
         cartFound = true 
      }
    }
    if(cartFound){
        const cart = new Cart(items,id)

        const block = new Block(Date.now(),data.blockchain[data.blockchain.length-1].hash,cart,undefined,undefined)
    
        data.addBlock(block)
    
        Fsdatabase.writeDb(data)
    
        return cart
    }else{
           return undefined
    }
}

function deleteCartByIdService(id:string) : boolean {
 let data = Fsdatabase.readDb()

 if(Object.keys(data).length==0){
    const blockchain = new Blockchain()
    Fsdatabase.writeDb(blockchain)
    data = new Blockchain(blockchain.blockchain)
 }

 let i=0
 var cartFound =false
 while(i<data.blockchain.length && !cartFound){
   if(data.blockchain[i].data.id == id){
      cartFound = true 
   }
 }

 if(cartFound){

     const block = new Block(Date.now(),data.blockchain[data.blockchain.length-1].hash,undefined,undefined,undefined)
 
     data.addBlock(block)
 
     Fsdatabase.writeDb(data)
 }

 return cartFound

}
export {postCartByIdService,getCartByIdService,patchCartByIdService,deleteCartByIdService}
