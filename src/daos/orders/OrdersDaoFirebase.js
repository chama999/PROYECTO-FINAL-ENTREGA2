import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js"

class CarritosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('orders')
    }

    async save(orders = { products: [] }) {
        return super.save(orders)
    }
}

export default CarritosDaoFirebase
