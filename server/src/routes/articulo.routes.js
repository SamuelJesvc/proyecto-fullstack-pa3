const express = require('express');
const router = express.Router();
const articuloController = require('../controllers/articulo.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Todas estas rutas están protegidas
router.use(authMiddleware);

router.get('/', articuloController.getArticulos);
router.post('/', articuloController.createArticulo);
router.delete('/:id', articuloController.deleteArticulo);

module.exports = router;
