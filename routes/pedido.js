const {Router} = require('express');
const {
    pedidosGet,
    pedidosGetById,
    pedidosVendedor,
    pedidosCreate,
    pedidosUpdate
    
} = require('../controllers/pedido');
const{ validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/all', pedidosGet);

router.get('/', pedidosGetById);

router.get('/:matricula',pedidosVendedor);

router.post('/', pedidosCreate);

router.put('/:idPedido', pedidosUpdate);




module.exports = router;
