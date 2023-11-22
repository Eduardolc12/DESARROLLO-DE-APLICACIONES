const {Router} = require('express');
const {
    ventaGet,
    ventaCreate,
} = require('../controllers/producto');
const{ validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
router.get('/', ventaGet);
router.post('/', ventaCreate);

module.exports = router;