const {Router} = require('express');
const {
    vendedorGet,
    vendedorCreate,
    vendedorDelete,
} = require('../controllers/vendedor');
const{ validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
router.get('/', vendedorGet);

router.post('/',vendedorCreate);

router.delete('/:id', [validarJWT], vendedorDelete);

module.exports = router;
