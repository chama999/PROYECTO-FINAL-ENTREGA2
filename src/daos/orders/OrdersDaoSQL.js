import ContenedorSQL from "../../contenedores/ContenedorSQL.js"
import { print } from "../../utils/objectUtils.js"

class OrdersDaoSQL {

    constructor(configOrders, configProds) {
        this.orders = new ContenedorSQL(configOrders, 'orders')
        this.products_orders = new ContenedorSQL(configProds, 'products_orders')
    }

    async save(obj) {
        const newObj = { ...obj, created_on: new Date(), deleted: false }
        const result = await this.orders.save(newObj)
        console.log("Resultado de Save")
        print(result)
        if (result)
        { return result}
        else {result.products = []
            return result}
        

    }

    async listById(_id_order) {
        const id_order = Number(_id_order)
        await this.orders.listById(id_order)
        const result = {
            id: id_order,
            products: []
        }
        const products_orders = await this.products_orders.listAll({ id_order })
        for (const prod of products_orders) {
            delete prod.id_order
            result.products.push(prod)
        }
        return result
    }

    async update(order) {
        order.id = Number(order.id)
        let result = await this.products_orders.deleteAll({ id_order: order.id })
        console.log("Result DeleteAll", print(result))
        console.log("order.products", order.products)
        const inserts = order.products.map(p => {
            let result = this.products_orders.save({
                ...p,
                id_order: order.id
            })
            return result
        })
        console.log("inserts", inserts)
        return inserts
    }

    async deleteById(_id_order) {
        const id_order = Number(_id_order)
        const result = await Promise.allSettled([
            this.products_orders.deleteAll({ id_order }),
            this.orders.deleteById(id_order)
        ])
        return result
    }

    deleteAll() {
        return Promise.allSettled([
            this.orders.deleteAll(),
            this.products_orders.deleteAll()
        ])
    }

    async listAll() {
        console.log('listAll functions test')
        const ordersIds = await this.orders.listAll()

        const ordersMap = new Map()
        for (const obj of ordersIds) {
            ordersMap.set(obj.id, {
                id: obj.id,
                products: []
            })
        }
        const products_orders = await this.products_orders.listAll()
        for (const prod of products_orders) {
            if (ordersMap.has(prod.id_order)) {
                ordersMap.get(prod.id_order).products.push(prod)
            }
        }
        print(ordersMap)
        return [...ordersMap.values()]
    }
}

export default OrdersDaoSQL
