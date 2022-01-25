import knex from 'knex'
import config from '../../src/config.js'



// opciones SQL: mariaDb, sqlite3, MySql

createTableProducts(knex(config.sqlite3))
createTableOrders(knex(config.sqlite3))

/*createTableProducts(knex(config.mariaDb))
createTableOrders(knex(config.mariaDb))*/

//------------------------------------------
async function createTableProducts(sqlClient) {
    try {
        await sqlClient.schema.dropTableIfExists('products')

        await sqlClient.schema.createTable('products', table => {
            table.increments('id').primary()
            table.string('title', 30).notNullable()
            table.string('description', 1024)
            table.float('price').notNullable()
            table.string('thumbnail', 1024)
            table.integer('stock').notNullable()
            table.timestamp('created_on')
        })

        await sqlClient.destroy()

        console.log('Tabla productos creada con éxito')
    } catch (error) {
        console.log('Error al crear tabla productos\n' + error)
    }
}

//------------------------------------------

async function createTableOrders(sqlClient) {
    try {
        await sqlClient.schema.dropTableIfExists('orders')

        await sqlClient.schema.createTable('orders', table => {
            table.increments('id').primary()
            table.boolean('deleted').defaultTo(false)
            table.datetime('created_on')
            table.string('user_id', 100).defaultTo('admin')
        })

        await sqlClient.schema.dropTableIfExists('products_orders')

        await sqlClient.schema.createTable('products_orders', table => {
            table.increments('id').primary()
            table.integer('id_order').notNullable()
            table.integer('id_product').notNullable()
            table.integer('quantity').notNullable()
            table.integer('updated_stock')
        })

        await sqlClient.destroy()

        console.log('Tablas Orders & Products_Orders creadas con éxito')
    } catch (error) {
        console.log('Error al crear tablas Orders & Products_Orders\n' + error)
    }
}
