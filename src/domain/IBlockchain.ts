import {Block} from './Block'

interface IBlockchain{
 blockchain : Block[]
 addBlock(block:Block) :Block
 replace(blockchain:IBlockchain) : boolean
 isValid(blockchain:IBlockchain) : boolean
}

export {IBlockchain}