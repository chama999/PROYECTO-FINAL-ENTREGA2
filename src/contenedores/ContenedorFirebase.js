import admin from "firebase-admin"
import config from '../config.js'
import { print } from "../utils/objectUtils.js";

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
})

const db = admin.firestore();

class ContenedorFirebase {

    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }

    async listById(id) {
        try {
            const doc = await this.coleccion.doc(id).get();
            if (!doc.exists) {
                throw new Error(`Error al listar por id: no se encontró`)
            } else {
                const data = doc.data();
                if (!data.products) { data.products = [] }
                return { ...data, id, products: data.products}
            }
        } catch (error) {
            throw new Error(`Error al listar por id: ${error}`)
        }
    }

    async listAll() {
        try {
            const result = []
            const snapshot = await this.coleccion.get();
            snapshot.forEach(doc => {
                const data = doc.data();
                if (!data.products) { data.products = [] }
                result.push({ id: doc.id, ...doc.data(), products: data.products })
            })
            return result
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async save(nuevoElem) {
        try {
            const guardado = await this.coleccion.add(nuevoElem);
            return { ...nuevoElem, id: guardado.id }
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async update(nuevoElem) {
        try {
            const update = await this.coleccion.doc(nuevoElem.id).set(nuevoElem);
            return nuevoElem
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }
    }

    async deleteById(id) {
        try {
            console.log(`borrando ${id}`)
            //consulto doc para return
            const doc = await this.coleccion.doc(id).get();
            const data = doc.data();
            print ({...data, id})

            //eliminando
            const deleteDoc = await this.coleccion.doc(id).delete();

            return {...data, id}
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async deleteAll() {
        // version fea e ineficiente pero entendible para empezar
        try {
            const docs = await this.listAll()
            const ids = docs.map(d => d.id)
            const promesas = ids.map(id => this.deleteById(id))
            const resultados = await Promise.allSettled(promesas)
            const errores = resultados.filter(r => r.status == 'rejected')
            if (errores.length > 0) {
                throw new Error('no se borró todo. volver a intentarlo')
            }
            // const ref = firestore.collection(path)
            // ref.onSnapshot((snapshot) => {
            //     snapshot.docs.forEach((doc) => {
            //         ref.doc(doc.id).delete()
            //     })
            // })
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async desconnect() {
    }
}

export default ContenedorFirebase