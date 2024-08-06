const { Router } = require('express');
const { readXMLUrl } = require('../controllers/products');

const productRouter = Router();



productRouter.post("/read-xml-url", readXMLUrl)




module.exports = productRouter;
