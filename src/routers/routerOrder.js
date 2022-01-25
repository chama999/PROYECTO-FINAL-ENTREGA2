import express from 'express'
const { Router } = express

import {
    productsDao as productsApi,
    ordersDao as ordersApi
} from '../daos/index.js'
import { print } from '../utils/objectUtils.js'

//--------------------------------------------
// configuro router de ordenes

const ordersRouter = new Router()

//--------------------------------------------------
// router de order

ordersRouter.get('/', async (req, res) => {
    try{
        console.log("New GET /api/orders/. Buscando todas las ordenes:")
        const result = await ordersApi.listAll()
        print(result)
        res.json({status: 200, message: "Lista de Ordenes:", orders: result})
    }
    catch(err){
        res.status(500).json({status: 500, message: "Error al buscar orden"}) 
    }
})

ordersRouter.post('/', async (req, res) => {
    try{
        console.log("New POST /api/orders. Guardando orden: ")
        const result = await ordersApi.save(req.body)
        print(result)
        res.json({message: "Orden creada exitosamente",status: 200,order: result})
    }
    catch(error){
        res.status(500).json({status: 500, message: "Error al guardar orden"}) 
    }
})

ordersRouter.delete('/:id', async (req, res) => {
    try{
    console.log("New DELETE /api/orders/:id. Eliminando orden:")
    const result = await ordersApi.deleteById(req.params.id)
    res.json({message: "Se eliminó la orden correctamente", status: 200 ,order: result})
    }
    catch(error){
        res.status(500).json({status: 500, message: "Error al borrar orden"}) 
    }
})

//--------------------------------------------------
// router de products en order

ordersRouter.get('/:id/products', async (req, res) => {
    try{
    const order = await ordersApi.listById(req.params.id)
    console.log("New GET /api/orders/:id/products. Busbando productos de orden:" + req.params.id)
    print(order)
    res.json({order: order, status: 200, message: "Lista de productos de orden_id = " + req.params.id})
    }
    catch(error){
        res.status(500).json({status: 500, message: "Error al buscar orden"}) 
    }
})

ordersRouter.post('/:id/products', async (req, res) => {
    try{
        console.log("New POST /api/orders/:id/products. Guardando productos en order_id= " + req.params.id)
        const order = await ordersApi.listById(req.params.id)
        console.log(order)
        console.log("Length:" + req.body.length)
        console.log("Position: " + req.body[0].id_product)
        
        for (let i = 0; i < req.body.length; i++) {
            const product = await productsApi.listById(req.body[i].id_product)
            if (req.body[i].quantity > product.stock) {
                throw new Error({status: 500, message: "La cantidad del Producto solicitado es mayor al stock. Producto:" + product.title})
            }
            else{
                print(product)
                let buscarId = await order.products.findIndex(x => x.id_product == product.id)
                console.log("BuscarId: " + buscarId)
                if (buscarId === -1) {
                    order.products.push(req.body[i])
                }
                else{
                    order.products[buscarId].quantity += req.body[i].quantity
                }
            }
        }

        //actualizo stock de productos
        for (let i = 0; i < order.products.length; i++) {
            const product = await productsApi.listById(order.products[i].id_product)
            product.stock = product.stock - order.products[i].quantity
            order.products[i].updated_stock = product.stock
        }

        print(order)
        const result = await ordersApi.update(order)
        console.log("Resultado in routerOrder: " + result)
        print(result)
        if (result) {res.json({message: "Se guardó el producto en la orden", status: 200, order: order})}
    }
    catch(Error){
        print(Error.message)
        res.status(500).json({status: 500, message: "Error al guardar producto en la orden" || error.message}) 
    }
})

ordersRouter.delete('/:id/products/:id_product', async (req, res) => {
    try{
        const order = await ordersApi.listById(req.params.id)
        console.log("New DELETE /api/orders/:id/products/:id_product. Eliminando producto" + req.params.id_product +" de orden:" + req.params.id)
        console.log("Producto a eliminar: " + req.params.id_product)
        const index = order.products.findIndex(p => p.id_product == req.params.id_product)
        if (index != -1) {
            console.log("Eliminando producto de orden")
            //eliminar producto de la orden
            order.products.splice(index, 1)
            print(order.products)
            const result = await ordersApi.update(order)
            console.log("Producto eliminado de orden")
            res.json({message: "Producto eliminado de orden", status: 200, order: order})

        }
        else {
            throw new Error(error)
        }
    }
    catch(error){
        res.status(500).json({status: 500, message: "No se pudo eliminar el producto de la orden"}) 
    }   
})


export default ordersRouter
