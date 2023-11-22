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

router.get('/:name', productoGetByName);

router.post('/', productoCreate);

router.put('/:id', [validarJWT], productoUpdate);

module.exports = router;
