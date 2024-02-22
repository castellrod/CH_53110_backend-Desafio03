const express = require('express');
const ProductManager = require('./productManager.js');

const PORT = 8051;
const app = express();

const proman = new ProductManager('../productos.json');


app.get('/', async (req, res) => {
    try {
        let limit = req.query.limit;
        let result = await proman.getProducts(); 
        if (limit && limit > 0) {
            result = result.slice(0, limit);
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

app.get('/productos', async (req, res) => {
    try {
        let limit = req.query.limit;
        let result = await proman.getProducts(); 
        if (limit && limit > 0) {
            result = result.slice(0, limit);
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

app.get('/productos/:id', async (req, res) => {
    let { id } = req.params;
    id = Number(id);

    if (isNaN(id)) {
        return res.send('El id debe ser del tipo numérico');
    }

    try {
        let product = await proman.getProductById(id);
        res.json(product);
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener el producto' });
    }
});

app.get('*', (req, res) => {
    res.send('Error 404 - No encontrado')
})

app.listen(PORT, () => {
    console.log(`Server Online en puerto ${PORT}`);
});