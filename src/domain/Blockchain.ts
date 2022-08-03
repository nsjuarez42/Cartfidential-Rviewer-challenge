import { Block } from './Block';
import {IBlockchain} from './IBlockchain'

class Blockchain implements IBlockchain{

    /*TODO:
    methods implementation
    replace and is valid use in blockchain
    blockchain format
    
    */

    blockchain : Block[]

    constructor(blockchain?:Block[]){
        if(blockchain){
            this.blockchain = blockchain
        }else{
            this.blockchain = [Block.getGenesisBlock()]
        }
    }

    /*Adds new block to blockchain*/
    addBlock(block: Block): Block {
        this.blockchain.push(block)
        return block
    }
    /** The new blockchain that is a candidate for replacing the current blockchain */
    replace(blockchain: IBlockchain): boolean {
        throw new Error('Method not implemented.');
    }
         /**
           * Validates the chain by checking if:
           * - Genesis Block hash match given blockchain genesis block hash
           * - every element's last hash value matches previous block's hash
           * - data hasn't been tampered (which will produce a different hash value)
           */
    isValid(blockchain: IBlockchain): boolean {
        throw new Error('Method not implemented.');
    }
    
}

export {Blockchain}