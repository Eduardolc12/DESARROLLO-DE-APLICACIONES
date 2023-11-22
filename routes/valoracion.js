const {Router} = require('express');
const {
    valoracionGet,
    valoracionCreate,
    valoracionUpdate,
} = require('../controllers/valoracion.js');
const{ validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
router.get('/', valoracionGet);

router.post('/', valoracionCreate);

router.put('/:id', [validarJWT], valoracionUpdate);

module.exports = router;
