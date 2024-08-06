const { Router } = require('express');
const { readXMLUrl, readAndSummarizeUrl } = require('../controllers/products');

const productRouter = Router();



productRouter.post("/read-xml-url", readXMLUrl)
productRouter.post("/summarize-url", readAndSummarizeUrl)




module.exports = productRouter;
