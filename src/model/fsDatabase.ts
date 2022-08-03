const fs = require('fs')

const PATH ='./src/model/data/data.json'


class fsDatabase implements IDatabase{
    readDb() {
        const db = fs.readFileSync(PATH)
        return JSON.parse(db)
    }
    writeDb(data: any) : boolean {
        
        try {
            fs.writeFileSync(PATH,JSON.stringify(data))
            return true 
        } catch (error) {
            console.log(error)
            return false
        }
    }

}