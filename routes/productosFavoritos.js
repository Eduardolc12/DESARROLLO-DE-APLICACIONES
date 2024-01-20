const {Router} = require('express');
const {
    productoFavGet,
    productoById,
    productoFavCreate,
    productoFavDelete,
} = require('../controllers/productosFavoritos');
const{ validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
router.get('/:matricula', productoFavGet);
router.get('/busqueda/:id_producto', productoById);
router.post('/', productoFavCreate);
router.delete('/:idFavoritos', productoFavDelete);

module.exports = router;
