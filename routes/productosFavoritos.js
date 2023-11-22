const {Router} = require('express');
const {
    productoFavGet,
    productoFavCreate,
    productoFavDelete,
} = require('../controllers/producto');
const{ validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
router.get('/', productoFavGet);
router.post('/', productoFavCreate);
router.delete('/:id', [validarJWT], productoFavDelete);

module.exports = router;
