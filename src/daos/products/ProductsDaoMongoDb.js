import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"

class ProductsDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('products', {
            title: { type: String, required: true },
            description: { type: String, required: true },
            price: { type: Number, required: true },
            stock: { type: Number, required: true },
            thumbnail: { type: String, required: true },
        })
    }
}

export default ProductsDaoMongoDb
