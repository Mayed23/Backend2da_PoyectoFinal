const { productService } = require("../routes/service/service");
const { CustomError } = require("../utils/errors/CustomError");
const { EErrors } = require("../utils/errors/enums");
const { generateErrorInfo } = require("../utils/errors/info");
const { generateProducts } = require("../utils/generateProducts");




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
                const products = await this.productService.get({status: status}, options)
                res.status(200). json(products)
            }
            if (category != undefined) {
                const products = await this.productService.get({category: category}, options)
                res.status(200). json(products)
            } 
    
            const products = await this.productService.get({}, options)
            
            const{totalPages, docs, hasPrevPage, hasNextPage, prevPage, nextPage} = products
            res.status(200).json({
                status: "success", 
                products: docs,
                totalPages,
                prevPage,
                nextPage,
                page: products.page,
                hasPrevPage,
                hasNextPage,
                prevLink: `http://localhost:8080/products?page=${prevPage}`,
                nextLink: `http://localhost:8080/products?page=${nextPage}`,
            
           })
        }catch (error) {
            logger.error(error)
        }
    }

    getProductById = async (req, res) =>{
        try{
            let id = req.params.id
            let productId = await this.productService.getById(id)
            if(!productId) return `producto no encontrado`
            res.send({
                status: `success`,
                payload: productId
            })
        } catch(error){
            logger.error(error)
        }
    
    }

    createProducts = async (req, res) => {
        const newProduct= req.body
        try{        
            let { title, price, description, thumbnail, status, stock, code, category } = newProduct
       
            if( !title || !price || !description || !thumbnail || !status || !stock || !code || !category)
            
            res.send({ status: `error`, error: `Ingrese todos los campos`})
            
            const prodNew = await this.productService.create(newProduct)
            
            res.status(200).json(prodNew)
        }catch(error){
            logger.error('Error al agregar producto:', error);
            return 'Error al agregar el producto';
        }   
    }

    updateProduct = async (req, res) =>{
        let id = req.params.id
        let updateProd = req.body
        try{
            await this.productService.update(id, updateProd)
            logger.info(updateProd)
           
            const prodOne = await this.productService.getById(id)
                res.status(200).json({
                msg: `Producto Actualizado`, prodOne
            })
            logger.error(prodOne)
        }catch(error){
            return `Cambios no realizados`
        }
    }

    deleteProduct = async (req, res) =>{
        let {id} = req.params
        try{
           const deleteProd = await this.productService.delete({_id: id})
            res.status(200).json({
            msg: `Producto Eliminado con Exito`, deleteProd})
                        
        } catch(error){
            logger.error(error)
        }
        
    }

    getMonckingProducts = async (req, res, next) => {
        
        try{
            const prodMonk = generateProducts()
             if (prodMonk.length > 1) 
                CustomError({
                name: `Error mock`, 
                message:  `Error al generar productos Mock`, 
                cause: generateErrorInfo({prodMonk}), 
                code: EErrors.PRODUCT_NOT_FOUND
                })
            
            
            res.status(200).json(prodMonk);
        }catch(error){
            next(error)
            res.status(500).json({msg: `Error en el Servidor`})
        }
    }
}

module.exports = ProductsController

