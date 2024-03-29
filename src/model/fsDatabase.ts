const fs = require('fs')

const PATH ='./src/model/data/data.json'

class Fsdatabase {
    static readDb() {
        const db = fs.readFileSync(PATH)
        return JSON.parse(db)
    }
    static writeDb(data: any) : boolean {
        
        try {
            fs.writeFileSync(PATH,JSON.stringify(data))
            return true 
        } catch (error) {
            console.log(error)
            return false
        }
    }

}

export {Fsdatabase}