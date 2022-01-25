import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js"

class ProductosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('products')
    }
}

export default ProductosDaoFirebase
