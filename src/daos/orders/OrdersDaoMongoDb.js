import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"

class CarritosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('orders', {
            products: { type: [], required: true }
        })
    }

    async save(orders = { productos: [] }) {
        return super.save(orders)
    }
}

export default CarritosDaoMongoDb
