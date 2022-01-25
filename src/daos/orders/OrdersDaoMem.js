import ContenedorMemoria from "../../contenedores/ContenedorMemoria.js"

class CarritosDaoMem extends ContenedorMemoria {

    async save(obj) {
        let newObj = { ...obj, created_on: new Date(), deleted: false, products: [] }
        return super.save(newObj)
    }
}

export default CarritosDaoMem
