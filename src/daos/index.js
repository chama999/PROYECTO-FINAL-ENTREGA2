import config from '../config.js'
let productsDao
let ordersDao

switch (config.env.PERS) {
    case 'json':
        const { default: ProductsDaoArchivo } = await import('./products/ProductsDaoArchivo.js')
        const { default: OrdersDaoArchivo } = await import('./orders/OrdersDaoArchivo.js')

        productsDao = new ProductsDaoArchivo()
        ordersDao = new OrdersDaoArchivo()
        break
    case 'firebase':
        const { default: ProductsDaoFirebase } = await import('./products/ProductsDaoFirebase.js')
        const { default: OrdersDaoFirebase } = await import('./orders/OrdersDaoFirebase.js')

        productsDao = new ProductsDaoFirebase()
        ordersDao = new OrdersDaoFirebase()
        break
    case 'mongodb':
        const { default: ProductsDaoMongoDb } = await import('./products/ProductsDaoMongoDb.js')
        const { default: OrdersDaoMongoDb } = await import('./orders/OrdersDaoMongoDb.js')

        productsDao = new ProductsDaoMongoDb()
        ordersDao = new OrdersDaoMongoDb()
        break
    case 'mariadb':
        const { default: ProductsDaoMariaDb } = await import('./products/ProductsDaoMariaDb.js')
        const { default: OrdersDaoMariaDb } = await import('./orders/OrdersDaoMariaDb.js')

        productsDao = new ProductsDaoMariaDb()
        ordersDao = new OrdersDaoMariaDb()
        break
    case 'sqlite3':
        const { default: ProductsDaoSQLite3 } = await import('./products/ProductsDaoSQLite3.js')
        const { default: OrdersDaoSQLite3 } = await import('./orders/OrdersDaoSQLite3.js')

        productsDao = new ProductsDaoSQLite3()
        ordersDao = new OrdersDaoSQLite3()
        break
    default:
        const { default: ProductsDaoMem } = await import('./products/ProductsDaoMem.js')
        const { default: OrdersDaoMem } = await import('./orders/OrdersDaoMem.js')

        productsDao = new ProductsDaoMem()
        ordersDao = new OrdersDaoMem()
        break
}

export { productsDao, ordersDao }