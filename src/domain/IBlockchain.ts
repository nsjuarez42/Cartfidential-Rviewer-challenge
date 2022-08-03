import {Block} from './Block'
interface IBlockchain{
 addBlock(block:Block) :Block
 replace(blockchain:IBlockchain) : boolean
 isValid(blockchain:IBlockchain) : boolean
}

export {IBlockchain}