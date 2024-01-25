const {Router} = require('express');
const {
    ventaGet,
    ventaGetMatricula,
    ventaCreate,
} = require('../controllers/venta');
const{ validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
router.get('/', ventaGet);
router.get('/busqueda/:matricula', ventaGetMatricula);
router.post('/', ventaCreate);

module.exports = router;