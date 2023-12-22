const {Router} = require('express');
const {
    productoGet,
    productoGetByName,
    productoCreate,
    productoUpdate,
} = require('../controllers/producto');
const{ validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
router.get('/', productoGet);

router.get('/:nombre', productoGetByName);

router.post('/', productoCreate);

router.put('/:id_producto', [validarJWT], productoUpdate);

module.exports = router;
