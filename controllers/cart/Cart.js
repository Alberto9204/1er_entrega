const {promises: fs} = require ('fs')

class Cart {
    constructor() {
        this.route = './cart.json'
    }

    async newCart(){
        try {
            const cartRoute = JSON.parse(await fs.readFile(this.route,'utf-8'))
            let newId;
                if(cartRoute.length == 0){
                    newId = 1;
                }else {
                    newId = cartRoute[cartRoute.length - 1].id + 1;
                }
            const newCart = {
                id: newId, 
                timestamp: new Date(), 
                productos: []
            }
            cartRoute.push(newCart)
            await fs.writeFile(this.route,JSON.stringify(cartRoute, null, 2))
            return newCart
        } catch (error) {
            return(error)
        }
    }

    async getProductCartById(id_carrito){
        try {
            const cartRoute = JSON.parse(await fs.readFile(this.route,'utf-8'))
            const elementosFiltrados = cartRoute.filter(e => e.id === (parseInt(id_carrito)))
            console.log(elementosFiltrados)
            if(elementosFiltrados.length === 0){
                return({ error : 'Carrito no encontrado' })
            } else {
                const cartProducts = elementosFiltrados.find(element => element.productos);
                console.log(cartProducts.productos)
                return(cartProducts.productos)
            }
        } catch (error) {
            return(error)
        }
    }

    async addToCart(id_carrito, id){
        try {
            const cartRoute = JSON.parse(await fs.readFile(this.route,'utf-8'))
            const elementosFiltrados = cartRoute.filter(e => e.id === (parseInt(id_carrito))) 
            const content = JSON.parse(await fs.readFile('./productos.json','utf-8'))
            const ProductoFiltrados = content.find(e => e.id === (parseInt(id))) 
            const cartProducts = elementosFiltrados.find(element => element.productos);
          
            if(elementosFiltrados.length === 0){
                return({ error : 'Carrito no encontrado' })
            } else {
                if(ProductoFiltrados === undefined ) {
                    return({ error : 'Producto no encontrado' })
                } else {
                    cartProducts.productos.push(ProductoFiltrados) 
                    await fs.writeFile(this.route,JSON.stringify(cartRoute, null, 2))
                    return elementosFiltrados
                }
            }
        } catch (error) {
            return(error)
        }
    }

    async deleteCartById (id) {
        try {
            const cartRoute = JSON.parse(await fs.readFile(this.route,'utf-8'))
            const elementosFiltrados = cartRoute.filter(e => e.id !== parseInt(id))
            if(elementosFiltrados.length === (cartRoute.length)){
                return({ error : 'Carrito no encontrado' })
            } else {
                await fs.writeFile(this.route,JSON.stringify(elementosFiltrados, null, 2))
                return(elementosFiltrados)
            }
        } catch (error) {
            return(error)
        }
    }

    async deleteProductInCartById(id_carrito, id){
        try {
            const cartRoute = JSON.parse(await fs.readFile(this.route,'utf-8'))
            const elementosFiltrados = cartRoute.filter(e => e.id === (parseInt(id_carrito))) 
            const content = JSON.parse(await fs.readFile('./productos.json','utf-8'))
            const ProductoFiltrados = content.find(e => e.id === (parseInt(id))) 
            const cartProducts = elementosFiltrados.find(element => element.productos);
            if(elementosFiltrados.length === 0){
                return({ error : 'Carrito no encontrado' })
            } else {
                if(ProductoFiltrados === undefined ) {
                    return({ error : 'Producto no encontrado en base de datos' })
                } else {
                    const indexProduct = cartProducts.productos.findIndex((prod) => prod.id == id)
                    if(indexProduct == -1){
                    return({ error : 'Producto no encontrado en el carrito' })
                    }else{
                        cartProducts.productos.splice(indexProduct,1)
                        await fs.writeFile(this.route,JSON.stringify(cartRoute, null, 2))
                        return elementosFiltrados
                    }
                }
            }
            } catch (error) {
                return(error)   
            }
    }
}

const cartController = new Cart()
module.exports = cartController