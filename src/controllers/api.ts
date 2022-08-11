import { Application, Request, Response } from 'express';
import {deleteCartByIdService, getCartByIdService, patchCartByIdService, postCartByIdService} from '../services/cartService'

import { PingService } from "../services/ping-service";

function checkId(id:any){
   if(!id){
    
   }
}

async function getCartById(req:Request,res:Response){
 if(!req.params.id){
    res.status(404).send({error:"Cart not found for the given id"})
 }

 const {id} = req.params

 const cart = getCartByIdService(id)

 if(cart == undefined){
    res.status(404).send({error:"Cart not found for the given id"})
 }else{
    res.status(200).send({items:cart.items})
 }
} 

async function postCartById(req:Request,res:Response){
   if(!req.params.id || !req.body.items){
      res.status(400).send({error:"Invalid body provided"})
   }
  
   const {id} = req.params
   const {items} = req.body

   const cart = postCartByIdService(id,items)

   if(cart == undefined){
      res.status(409).send({error:"Cart already exists"})
   }else{
      res.status(201).send({msg:"Cart created successfully"})
   }
  
}

async function patchCartById(req:Request,res:Response){

 if(!req.params.id || !req.body.items){
   res.status(400).send({error:"Invalid body provided"})
 }

 const {id} = req.params
 const {items} = req.body

 const cart = patchCartByIdService(id,items)

 if(cart == undefined){
    res.status(404).send({error:"Cart not found"})
 }else{
    res.status(200).send({msg:"Cart successfully updated"})
 }
}

async function deleteCartById(req:Request,res:Response){

   if(!req.params.id){
      res.status(404).send({error:"Cart not found for the given id"})
   }

   const {id} = req.params

   const cartDeleted = deleteCartByIdService(id)
 
   if(cartDeleted){
      res.status(200).send({msg:"Cart deleted successfully"})
   }else{
      res.status(404).send({error:"Cart not found for the given id"})
   }

}

export const loadEndpoints = (app: Application): void => {
    app.get("/ping", (req: Request, res: Response) => {
        return res.status(200).send(new PingService().getPing())
    });

    app.get('/carts/:id',getCartById)
    app.post('/carts/:id',postCartById)
    app.patch('carts/:id',patchCartById)
    app.delete('carts/:id',deleteCartById)
};
