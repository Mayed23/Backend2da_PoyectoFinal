const { productService } = require("../routes/service/service");


class ProductsController{
    constructor(){
        this.productService = productService
     }

    getProducts = async (req, res) =>{
        const {limit, page, sort, category, status} = req.query
        try{
            const options = { 
                limit: limit || 12, 
                page: page || 1, 
                sort: { price: sort === "asc" ? 1 : -1,}, 
                lean: true
            }
            if (status != undefined) {
                const products = await this.productService.getProducts({status: status}, options)
                res.status(200). json(products)
            }
            if (category != undefined) {
                const products = await this.productService.getProducts({category: category}, options)
                res.status(200). json(products)
            } 
    
            const products = await this.productService.getProducts({}, options)
            
            const{totalPages, docs, hasPrevPage, hasNextPage, prevPage, nextPage} = products
            res.status(200).json({
                status: "success", 
                products: docs,
                totalPages,
                prevPage,
                nextPage,
                page: products.page,
                hasPrevPage,
                hasNextPage
            
           })
        }catch (error) {
            console.log(error)
        }
    }

    getProductById = async (req, res) =>{
        try{
            let id = req.params.id
            let productId = await this.productService.getProductById(id)
            if(!productId) return `producto no encontrado`
            res.send({
                status: `success`,
                payload: productId
            })
        } catch(error){
            console.log(error)
        }
    
    }

    getProductsLimit = async (req, res) =>{
        try{
            const limit = req.params.limit
            const products = await this.productService.getProductByLimit();
            const productsList = []
            for (let i = 0; i < limit; i++) {
              productsList.push(products[i]);
            }
            res.send({
                status: `success`,
                payload: productsList
            })
          
        }catch(error){
            console.log(error)
        }
        
    }

    createProducts = async (req, res) => {
        const newProduct= req.body
        try{        
            let { title, price, description, thumbnail, status, stock, code, category } = newProduct
       
            if( !title || !price || !description || !thumbnail || !status || !stock || !code || !category)
            
            res.send({ status: `error`, error: `Ingrese todos los campos`})
            
            const prodNew = await this.productService.createProduct(newProduct)
            
            res.status(200).json(prodNew)
        }catch(error){
            console.error('Error al agregar producto:', error);
            return 'Error al agregar el producto';
        }   
    }

    updateProduct = async (req, res) =>{
        let id = req.params.id
        let updateProd = req.body
        try{
            await productService.updateProduct(id, updateProd)
            console.log(updateProd)
           
            const prodOne = await this.productService.getProductId(id)
            prodOne.set(updateProd)
            res.status(200).json({
               msg: `Producto Actualizado`, prodOne
            })

            await prodOne.save()
        }catch(error){
            return `Cambios no realizados`
        }
    }

    deleteProduct = async (req, res) =>{
        let {id} = req.params
        try{
           const deleteProd = await this.productService.deleteProduct({_id: id})
            res.status(200).json({
            msg: `Producto Eliminado con Exito`, deleteProd})
                        
        } catch(error){
            console.log(error)
        }
        
    }
}

module.exports = ProductsController

