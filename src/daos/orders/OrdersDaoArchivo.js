import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js"

class CarritosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('orders.json')
    }

    async save(obj) {
        return super.save(obj)
    }
}

export default CarritosDaoArchivo
