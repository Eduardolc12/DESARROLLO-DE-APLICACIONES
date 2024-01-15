const {Router} = require('express');
const {
    productoGet,
    productoGetByName,
    productoCreate,
    productoUpdate,
    subirImagen,
    productoDelete
} = require('../controllers/producto');
const{ validarJWT } = require('../middlewares/validar-jwt');
const{imagen} =require('../middlewares/storage');

const router = Router();
router.get('/', productoGet);

router.get('/:nombre', productoGetByName);

router.post('/', productoCreate);

router.post('/subirImagen', imagen.single('imagenProducto'), subirImagen);

router.put('/:id_producto', productoUpdate);
 
router.delete('/:id_producto', productoDelete)

module.exports = router;
