interface IBlock{
    timestamp:number
    lastHash:string
    data:any
    nonce:string
    hash:string | undefined
}

export {IBlock}