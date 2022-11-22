const {Router} = require('express')
const cartController = require('../../controllers/cart/Cart')
const routerCart = new Router()


routerCart.get('/:id/products', async (req,res,next) => {
    const { id } = req.params
    const productos = await cartController.getProductCartById(id)
    res.send(productos)
})

routerCart.post('/', async (req, res, next) => {
    const newCart = await cartController.newCart()
    console.log(newCart)
    res.send(newCart)
})


routerCart.post('/:id/products/:id', async (req,res,next) => {
    const { id_carrito, id } = req.params
    const addProductos = await cartController.addToCart(id_carrito, id)
    res.send(addProductos)
})

routerCart.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    const deleteProducto = await cartController.deleteCartById(id)
    res.send(deleteProducto)
})

routerCart.delete('/:id/products/:id', async (req,res,next) => {
    const { id_carrito, id } = req.params
    const addProductos = await cartController.deleteProductInCartById(id_carrito, id)
    res.send(addProductos)
})

module.exports = routerCart