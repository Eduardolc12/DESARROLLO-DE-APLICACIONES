const {Router} = require('express');
const {
    estudiantesGet,
    estudiantesGetById,
    estudiantesLogin,
    estudiantesCreate,
    estudiantesUpdate,
    estudiantesUpdatePass,
    estudiantesDelete
} = require('../controllers/estudiantes');
const{ validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/login', estudiantesLogin);

router.get('/', estudiantesGet);

router.get('/:id', estudiantesGetById);

router.post('/', estudiantesCreate);

router.put('/:id', [validarJWT], estudiantesUpdate);

router.patch('/:id', [validarJWT], estudiantesUpdatePass);

router.delete('/:id', [validarJWT], estudiantesDelete);


module.exports = router;
