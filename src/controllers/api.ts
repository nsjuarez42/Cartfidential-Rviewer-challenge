import { Application, Request, Response } from 'express';
import { PingService } from "../services/ping-service";
import {getCartByIdService} from '../services/cartService'

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
  
}

async function patchCartById(req:Request,res:Response){

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
