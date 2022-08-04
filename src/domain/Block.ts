import {IBlock} from './IBlock'

const crypto = require("crypto")

class Block implements IBlock{
     
    timestamp:number
    lastHash:string
    data:any
    nonce:string
    hash:string | undefined

    constructor(timestamp:number,lastHash:string,data:any,hash:string | undefined,nonce:string | undefined){
      this.timestamp = timestamp
      this.lastHash = lastHash
      nonce !== undefined? this.nonce=nonce :this.nonce = crypto.randomBytes(16).toString('base64')
      this.data = data
      hash !== undefined ? this.hash=hash : this.hash =Block.generateHashFromBlock(this)    }

    static getGenesisBlock() : Block{
     const timestamp = Date.now()
     const nonce =crypto.randomBytes(16).toString('base64')
     const data = "b8958fa52c34d3f9421ad5f19125ecd0d7a9004d7fc318cd8fe8f15bbe12159495e7e27be52e0e87cd81463f29a2c0"
     const lastHashData =timestamp + nonce + data
     const lastHash = crypto.createHash('sha256').update(lastHashData).digest('hex')
   //const hashData = timestamp + nonce + data + lastHash
   //const hash =crypto.createHash('sha256').update(hashData).digest('hex')

     return new Block(timestamp,lastHash,data,undefined,nonce)
    }

    static generateHashFromBlock(block:Block) : string{
      const hashData = block.timestamp + block.data + block.lastHash + block.nonce
      return crypto.createHash('sha256').update(hashData).digest('hex')
    }
}

export{Block}