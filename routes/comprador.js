const {Router} = require('express');
const {
    compradorGet,
    compradorCreate,
    compradorDelete,
    productosGet
} = require('../controllers/comprador');
const{ validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
router.get('/', compradorGet);

router.get('/:matricula',productosGet)
router.post('/',compradorCreate);

router.delete('/:idComprador', compradorDelete);

module.exports = router;
