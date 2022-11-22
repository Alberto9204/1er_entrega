const {promises: fs} = require ('fs')

class Products {
    constructor() {
        this.route = './productos.json'
    }
    async getAll() {
        try {
            const content = JSON.parse(await fs.readFile(this.route,'utf-8'))
            return content
        } catch (error) {
            return []
        }
    }
    async getById(id){
        try {
            const content = JSON.parse(await fs.readFile(this.route,'utf-8'))
            const elementosFiltrados = content.filter(e => e.id === (parseInt(id)))
            if(elementosFiltrados.length === 0){
                return({ error : 'producto no encontrado' })
            } else {
                return(elementosFiltrados)
            }
        } catch (error) {
            return({error})
        }
    }

    async save(timestamp, nombre, descripcion, código, foto, precio, stock) {
        try {
                const content = JSON.parse(await fs.readFile(this.route,'utf-8'))
                let newId;
                if(content.length == 0){
                    newId = 1;
                }else {
                    newId = content[content.length - 1].id + 1;
                }
                const newObj = {
                    timestamp: new Date(),
                    nombre: nombre,
                    descripcion: descripcion,
                    código: código,
                    foto: foto,
                    precio: precio,
                    stock: stock,
                    id: newId
                }
                content.push(newObj);
                await fs.writeFile(this.route,JSON.stringify(content, null, 2))
                return(newObj)
            }
        catch (error) {
            return(error)
        }
    }

    async update(timestamp, nombre, descripcion, código, foto, precio, stock, id) {
        try{
            const content = JSON.parse(await fs.readFile(this.route,'utf-8'))
            let identificacion = Number(id)
            let index = content.findIndex(prod => prod.id === identificacion)
            const newProduct = {timestamp, nombre, descripcion, código, foto, precio, stock, "id": identificacion};
            if(index === 1 ) {
                return({ error : 'producto no encontrado' }
                ) 
            } else {
                content[index] = newProduct
                await fs.writeFile(this.route,JSON.stringify(content, null, 2))
                return(content);
            }
        } catch (error) {
            return(error)
        }
    }
    async deleteAll(){
        try {
            await fs.writeFile(`./$productos.json`,JSON.stringify([], null, 2))
            const content = JSON.parse(await fs.readFile(this.route,'utf-8'))
            console.log(content)
        } catch (error) {
            console.log(error)
            return "no pudo eliminarse"
        }
    }
    async deleteById (id) {
        try {
            const content = JSON.parse(await fs.readFile(this.route,'utf-8'))
            const elementosFiltrados = content.filter(e => e.id !== parseInt(id))
            if(elementosFiltrados.length === (content.length)){
                return({ error : 'producto no encontrado' })
            } else {
                await fs.writeFile(this.route,JSON.stringify(elementosFiltrados, null, 2))
                return(elementosFiltrados)
            }
        } catch (error) {
            return(error)
        }
    }
}

const productController = new Products()

module.exports = productController