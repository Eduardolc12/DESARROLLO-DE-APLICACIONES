const {Router} = require('express');
const {
    pedidosGet,
    pedidosGetById,
    pedidosCreate,
    pedidosUpdate
    
} = require('../controllers/pedido');
const{ validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/all', pedidosGet);

router.get('/:idPedido', pedidosGetById);

router.post('/', pedidosCreate);

router.put('/:idPedido', pedidosUpdate);




module.exports = router;
