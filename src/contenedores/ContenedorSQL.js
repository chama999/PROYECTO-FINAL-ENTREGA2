import knex from 'knex'
import { asPOJO, print } from '../utils/objectUtils.js'

class ContenedorSQL {

    constructor(config, tabla) {
        this.knex = knex(config)
        this.tabla = tabla
    }

    async listById(id) {
        try {
            const [rowDataPacket] = await this.knex.select('*').from(this.tabla).where('id', Number(id))
            if (!rowDataPacket) throw 'elemento no encontrado'
            return asPOJO(rowDataPacket)
        } catch (error) {
            throw new Error(`Error al listar por id: ${error}`)
        }
    }

    async listAll(criterio = {}) {
        try {
            console.log('ListAll-ContenedorSQL')
            const elems = await this.knex.select('*').from(this.tabla).where(criterio)
            print(elems)
            const elemento = elems.map(e => asPOJO(e))
            print(elemento)
            return elemento
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async save(elem) {
        try {
            print(elem)
            const [newId] = await this.knex.insert(elem).into(this.tabla)
            elem.id = Number(newId)
            console.log("Saving-ContenedorSQL", elem)
            console.log(elem.id)
            return asPOJO(elem)
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async update(elem) {
        elem.id = Number(elem.id)
        try {
            await this.knex.update(elem).from(this.tabla).where('id', elem.id)
            return asPOJO(elem)
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async deleteById(id) {
        try {
            return this.knex.delete().from(this.tabla).where('id', Number(id))
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async deleteAll(criterio = {}) {
        try {
            return this.knex.delete().from(this.tabla).where(criterio)
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }
}

export default ContenedorSQL