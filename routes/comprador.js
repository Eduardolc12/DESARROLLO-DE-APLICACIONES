const {Router} = require('express');
const {
    compradorGet,
    compradorCreate,
    compradorDelete,
} = require('../controllers/comprador');
const{ validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
router.get('/', compradorGet);

router.post('/',compradorCreate);

router.delete('/:idComprador', [validarJWT], compradorDelete);

module.exports = router;
