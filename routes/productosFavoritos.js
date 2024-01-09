const {Router} = require('express');
const {
    productoFavGet,
    productoFavCreate,
    productoFavDelete,
} = require('../controllers/productosFavoritos');
const{ validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
router.get('/', productoFavGet);
router.post('/', productoFavCreate);
router.delete('/:idFavoritos', productoFavDelete);

module.exports = router;
