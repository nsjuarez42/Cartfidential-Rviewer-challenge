import { Pong } from '../../src/domain/Pong';
import app from '../../src/app';
import request from 'supertest';

describe('GET /ping', () => {
    it('should return 200 OK', () => {
        return request(app).get('/ping').expect(200)
    });

    it('should return `pong` in response', () => {
        return request(app).get('/ping').expect(new Pong().unmarshal())
    });
});

describe('GET /carts/{id}',()=>{
    //200
    it('should return 200',async()=>{
      const req = await request(app).get('/carts/123')
      expect(req.statusCode).toEqual(200)
    })
     //404
    it('should return 404 and an object with error property',async()=>{
      const req = await request(app).get('/carts/' + undefined)
      expect(req.statusCode).toEqual(404)
      expect(req.body).toHaveProperty("error")
    })
 
    it('should return 404 and an object with error property',async()=>{
        const req = await request(app).get('/carts/3232')
        expect(req.statusCode).toEqual(404)
        expect(req.body).toHaveProperty("error")
      })
})

describe('POST /cart/{id}',()=>{
//201
//created

const validCart={items:[
    {
        id:'3',
        name:'pen',
        quantity:3,
        price:1
    }
]}

it('should return status 201',async()=>{
   request(app).post('/carts/232')
   .send(validCart)
   .end((err,res)=>{
     expect(res.statusCode).toEqual('201')
     expect(res.body).toBeInstanceOf('object')
     expect(res.body).toHaveProperty('msg')
   })
})
//409
//already exists
it('should return status 409',async()=>{
 request(app).post('/carts/123')
 .send(validCart)
 .end((err,res)=>{
   expect(res.statusCode).toEqual(409)
   expect(res.body).toBeInstanceOf('object')
   expect(res.body).toHaveProperty('error')
 })
})
//400
//invalid body provided
it('should return status 400',async()=>{
 request(app).post('/carts/3223')
 .send({af:'fsd'})
 .end((err,res)=>{
  expect(res.statusCode).toEqual(400)
  expect(res.body).toBeInstanceOf('object')
  expect(res.body).toHaveProperty('error')
 })
})

})

describe('PATCH /cart/{id}',()=>{
    //200
    //created

    const updatedCart ={items:[
      {
        id:5,
        name:'pencil',
        quantity:5,
        price:2
      },{
        id:1,
        name:'tv',
        quantity: 1,
        price: 200
    }, {
        id:6,
        name:'control remote',
        quantity: 2,
        price: 20
    }
    ]
      

    }
    it('should return status 200',async()=>{
      request(app).patch('/carts/123')
      .send(updatedCart)
      .end((err,res)=>{
        expect(res.statusCode).toEqual(200)
        expect(res.body).toBeInstanceOf('object')
        expect(res.body).toHaveProperty('items')
      })
    })

    //404
    //not found
    it('should return 404',async()=>{
      request(app).patch('/carts/3231')
      .end((err,res)=>{
        expect(res.statusCode).toBe(404)
        expect(res.body).toBeInstanceOf('object')
        expect(res.body).toHaveProperty('error')
      })
    })
    
    //400
    //invalid body provided
    it('should return 400',async()=>{
     request(app).patch('/carts/123')
     .send(undefined)
     .end((err,res)=>{
      expect(res.statusCode).toBe(400)
      expect(res.body).toBeInstanceOf('object')
      expect(res.body).toHaveProperty('error')
     })
    })

})

describe('DELETE /cart/{id}',()=>{
    //200
    //deleted
    it('should return status 200',async()=>{
      request(app).delete('/carts/123')
      .end((err,res)=>{
        expect(res.statusCode).toBe(200)
      })
    })

    //404
    //cart not found
    it('should return status 404',async()=>{
     request(app).delete('/carts/23123')
     .end((err,res)=>{
      expect(res.statusCode).toBe(404)
      expect(res.body).toBeInstanceOf('object')
      expect(res.body).toHaveProperty('error')
     })
    })
})
