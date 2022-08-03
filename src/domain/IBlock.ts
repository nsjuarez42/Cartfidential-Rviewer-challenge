interface IBlock{
    timestamp:number
    lastHash:string
    data:any
    nonce:number
    hash:string | undefined
}

export {IBlock}