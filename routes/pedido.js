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

router.get('/:name', pedidosGetById);

router.post('/', pedidosCreate);

router.put('/:id', [validarJWT], pedidosUpdate);




module.exports = router;
