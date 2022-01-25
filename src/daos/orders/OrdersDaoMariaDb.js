import OrdersDaoSQL from "./OrdersDaoSQL.js"
import config from '../../config.js'

class OrdersDaoMariaDb extends OrdersDaoSQL {

    constructor() {
        super(config.mariaDb, config.mariaDb)
    }
}

export default OrdersDaoMariaDb
