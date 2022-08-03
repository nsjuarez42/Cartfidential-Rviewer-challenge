import { Application, Request, Response } from 'express';
import {getCartByIdService, patchCartByIdService, postCartByIdService} from '../services/cartService'

import { PingService } from "../services/ping-service";

//import {getCartByIdService} from '../services/cartService'


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
    res.status(200).send(cart)
 }
} 

async function postCartById(req:Request,res:Response){
   if(!req.params.id || !req.body.items){
      res.status(400).send({error:"Invalid body provided"})
   }
  
   const {id} = req.params
   const {items} = req.body
   console.log(id,items)
  //check that items is an array of cartItem

   const cart = postCartByIdService(id,items)

   if(cart == undefined){
      res.status(409).send({error:"Cart already exists"})
   }else{
      res.status(201).send({msg:"Cart created successfully"})
   }

  /*
  201 created
  400 invalid body provided
  409 already exists
  */
  
  
}

async function patchCartById(req:Request,res:Response){
//200 created
//400 invalid body
//404 not found

 if(!req.params.id || !req.body.items){
   res.status(400).send({error:"Invalid body provided"})
 }

 const {id} = req.params
 const {items} = req.body

 const cart = patchCartById(id,items)

 if(cart == undefined){
    res.status(404).send({error:"Cart not found"})
 }else{
    res.status(200).send({msg:"Cart successfully updated"})
 }
}

async function deleteCartById(req:Request,res:Response){

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
