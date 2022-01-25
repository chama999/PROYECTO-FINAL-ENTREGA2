import express from 'express'
const { Router } = express
import { print } from '../utils/objectUtils.js'

import {
    productsDao as productsApi,
} from '../daos/index.js'

//--------------------------------------------
// configuro router de products

const productsRouter = new Router()

productsRouter.get('/', async (req, res) => {
    try{
        console.log("New GET /api/products/. Busbando todos los productos:")
        const products = await productsApi.listAll()
        print(products)
        res.json({status: 200, message: "Lista de productos", products: products})
    }
    catch(err){
        console.log("Error al buscar producto:")
        print(error)
        res.status(500).json({status: 500, message: "Error al buscar producto"}) 
    }
})

productsRouter.get('/:id', async (req, res) => {
    try {
        console.log("New GET /api/products/:id. Busbando producto:")
        print(req.params.id)
        const result = await productsApi.listById(req.params.id)
        res.json({status: 200, message: "Producto encontrado", product: result})
        console.log("Resultado búsqueda de producto:")
        print(await productsApi.listById(req.params.id))
    }
    catch (error) {
        console.log("Error al buscar producto:")
        print(error)
        res.status(500).json({status: 500, message: "Error al buscar producto"}) 
    }
})

productsRouter.post('/', async (req, res) => {
    try{
        console.log("New POST /api/products. Guardando producto: ")
        const result = await productsApi.save(req.body)
        console.log("Resultado guardado de producto:")
        print(result)
        res.json({status: 200, message: "Producto guardado", product: result})
    }
    catch(error){
        console.log("Error al guardar producto:")
        print(error)
        res.status(500).json({status: 500, message: "Error al guardar producto"}) 
    }
})

productsRouter.put('/:id', async (req, res) => {
    try{
        console.log("New PUT /api/products/:id. Actualizando producto:")
        let newBody = req.body
        newBody.id = req.params.id
        print(newBody)
        const result = await productsApi.update(newBody)
        res.json({message: "Se actualizó el producto", status: 200, updated: result})    
    }
    catch(error){
        console.log("Error al actualizar producto:")
        print(error)
        res.status(500).json({status: 500, message: "Error al actualizar producto"}) 
    }
})

productsRouter.delete('/:id', async (req, res) => {
    try{
        console.log("New DELETE /api/products/:id. Borrando producto ID:" + req.params.id)
        const result = await productsApi.deleteById(req.params.id)
        res.json({message: "Producto eliminado", status: 200,productDeleted: result})
        print({message: "Producto eliminado", status: 200,productDeleted: result})
    }
    catch(error){
        console.log("Error al borrar producto:")
        print(error)
        res.status(500).json({status: 500, message: "Error al borrar producto"}) 
    }
})

export default productsRouter