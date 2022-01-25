class ContenedorMemoria {

    constructor() {
        this.elementos = []
    }

    syncListById(id) {
        const elem = this.elementos.find(elem => elem.id == Number(id))
        if (!elem) {
            throw new Error(`Error al listar: elemento no encontrado`)
        } else {
            return elem
        }
    }
    async listById(id) {
        const objs = await this.listAll()
        const buscado = await objs.find(o => o.id == Number(id))
        return buscado
    }

    listAll() {
        return [...this.elementos]
    }

    save(elem) {

        let newId
        if (this.elementos.length == 0) {
            newId = 1
        } else {
            newId = this.elementos[this.elementos.length - 1].id + 1
        }

        const newElem = { ...elem, id: Number(newId) }
        this.elementos.push(newElem)
        return newElem
    }

    update(elem) {
        const index = this.elementos.findIndex(p => p.id == Number(elem.id))
        if (index == -1) {
            throw new Error(`Error al actualizar: elemento no encontrado`)
        } else {
            this.elementos[index] = elem
            return elem
        }
    }

    deleteById(id) {
        const index = this.elementos.findIndex(elem => elem.id == Number(id))
        if (index == -1) {
            throw new Error(`Error al borrar: elemento no encontrado`)
        } else {
            return this.elementos.splice(index, 1)
        }
    }

    borrarAll() {
        this.elementos = []
    }
}

export default ContenedorMemoria
