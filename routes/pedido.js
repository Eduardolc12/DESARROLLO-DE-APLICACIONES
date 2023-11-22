const {Router} = require('express');
const {
    pedidosGet,
    pedidosGetByName,
    pedidosCreate,
    pedidosUpdate,
    
} = require('../controllers/pedido');
const{ validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', pedidosGet);

router.get('/:name', pedidosGetByName);

router.post('/', pedidosCreate);

router.put('/:id', [validarJWT], pedidosUpdate);




module.exports = router;
