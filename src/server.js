import express from 'express'
import  productsRouter from './routers/routerProduct.js'
import  ordersRouter  from './routers/routerOrder.js'

//------------------------------------------------------------------------
// instancio servidor

const app = express()

//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/products', productsRouter)
app.use('/api/orders', ordersRouter)

export default app