const {Router} = require('express');
const {
    productoGet,
    productoGetByName,
    productoByName,
    productoById,
    productoCreate,
    productoUpdate,
    subirImagen,
    productoDelete
} = require('../controllers/producto');
const{ validarJWT } = require('../middlewares/validar-jwt');
const{imagen} =require('../middlewares/storage');

const router = Router();
router.get('/', productoGet);

router.get('/:nombre,:matricula', productoGetByName);

router.get('/:nombre', productoByName);

router.get('/id/:id_producto', productoById);

router.post('/', productoCreate);

router.post('/subirImagen', imagen.single('imagenProducto'), subirImagen);

router.put('/:id_producto', productoUpdate);
 
router.delete('/:id_producto', productoDelete)

module.exports = router;
