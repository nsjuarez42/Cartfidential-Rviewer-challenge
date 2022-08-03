import {IBlock} from './IBlock'
const crypto = require("crypto")

/*TODO:
Data for genesis block
nonce generation
*/

class Block implements IBlock{
     
    timestamp:number
    lastHash:string
    data:any
    nonce:number
    hash:string | undefined

    constructor(timestamp:number,lastHash:string,data:any,hash:string | undefined,nonce:number){
      this.timestamp = timestamp
      this.lastHash = lastHash
      this.nonce = nonce
      this.data = data
      hash !== undefined ? this.hash=hash : this.hash =""
    }

    static getGenesisBlock() : Block{
     const timestamp = Date.now()
     const nonce =1
     const data = ""
     const lastHashData =timestamp + nonce + data
     const lastHash = crypto.createHash('sha256').update(lastHashData).digest('hex')
     const hashData = timestamp + nonce + data + lastHash
     const hash =crypto.createHash('sha256').update(hashData).digest('hex')

     return new Block(timestamp,lastHash,data,hash,nonce)
    }

    static generateHashFromBlock(block:Block) : string{
      const hashData = block.timestamp + block.data + block.lastHash + block.nonce
      return crypto.createHash('sha256').update(hashData).digest('hex')
    }
}

export{Block}