
const fs = require('fs')

class ProductManager{
    constructor(rutaArchivo){
        this.path = rutaArchivo
    }


    async getProducts(){
        if(fs.existsSync(this.path)){
            return JSON.parse(await fs.promises.readFile(this.path, {encoding: 'utf-8'}))
        } else{
            return []
        }
        
    }


    async addProduct(title, description, price, thumbnail, code, stock){
        let products = await this.getProducts()

        try {
            let exist = Array.from(products).find(product => product.code === code)
            if(exist){
                console.log(`El producto con code ${code} ya existe...!!`);
                return
            }

            console.log(title,", ",description,", ",price,", ",thumbnail,", ",code,", ",stock)

            /*if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.log("Todos los campos son obligatorios")
                return
            }*/

            let id = 1
            if(products.length > 0){
                id = products[products.length -1].id +1
            }
            let newProduct = {id, title, description, price, thumbnail, code, stock}
            Array.from(products).push(newProduct)

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 5))
            
        } catch (error) {
            console.log(error.message);
        }
        
    }



    async getProductById(id){

        try {
            const products = await this.getProducts()

            id=Number(id)
            if(isNaN(id)){
                return res.send("El id tiene que ser de tipo numérico...!!!")
            }
            const product = Array.from(products).find(p => Number(p.id) === id)
            if(!product){
                return {error: `No existe ningún producto con id: ${id}`}; 
            }
            return product
        } catch (error) {
            console.log(error.message);
            throw error
        }
    }

    async updateProduct(id, fieldToUpdate, value) {
        try {
            let products = await this.getProducts();
    
            let productIndex = -1;
    
            let updatedProduct = Array.from(products).map((p, index) => {
                if (p.id === id) {
                    p[fieldToUpdate] = value;
                    productIndex = index;
                }
                return p;
            });
    
            if (productIndex === -1) {
                console.log(`No existe ningún producto con id: ${id}`);
                return;
            }
    
            await fs.promises.writeFile(this.path, JSON.stringify(updatedProduct, null, 2), 'utf-8');
            console.log(`Producto con id ${id} actualizado correctamente.`);
        } catch (error) {
            console.log(`No es posible actualizar el producto con id ${id}: ${error.message}`);
        }
    }

    async deleteProduct(id){
        try {
            let products = await this.getProducts();
    
            const index = Array.from(products).findIndex(p => p.id === id);
    
            if (index !== -1) {
    
                products.splice(index, 1);
    
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
                console.log(`El producto con id ${id} se eliminó con éxito!!`);
            } else {
                console.log(`No existe ningún producto con id ${id}.`);
            }
        } catch (error) {
            console.error(`Error al intentar eliminar el producto con id ${id}: ${error.message}`);
        }
    }
}

module.exports = ProductManager;

 const funcion1=async()=>{
    let um=new ProductManager("../productos.json")
     /*await um.addUser("Carolina")
     await um.addUser("Luis")*/
     console.log(await um.getProducts())
     //await um.addProduct({title: "Baterias genericas"}, {description: "Baterias compatibles con cualquier dron"}, {price: "350"}, {thumbnail: "N/A"}, {code: "BAT584"}, {stock: "7"});
     await um.addProduct("Baterias genericas", "Baterias compatibles con cualquier dron", "350", "N/A", "BAT584", "7");
     await um.addProduct("cámara gimbal", "Cámara con gimbal génerico para cualquier dron", "4050", "N/A", "CAGMB874", "3");

     console.log(await um.getProducts())
     console.log(await um.getProductById(1))
     console.log(await um.updateProduct(2,"stock","13"))

 }

 funcion1()