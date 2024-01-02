const {Router} = require('express');
const {
    vendedorGet,
    vendedorCreate,
    vendedorDelete,
    vendedorGetProductos
} = require('../controllers/vendedor');
const{ validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
router.get('/', vendedorGet);

router.post('/',vendedorCreate);

router.delete('/:idVendedor', vendedorDelete);

router.get('/:matricula', vendedorGetProductos);

module.exports = router;
