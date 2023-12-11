const {Router} = require('express');
const {
    estudiantesGet,
    estudiantesGetById,
    estudiantesLogin,
    estudiantesCreate,
    estudiantesUpdate,
    estudiantesUpdatePass,
    estudiantesDelete
} = require('../controllers/estudiante');
const{ validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/login', estudiantesLogin);


router.get('/all', estudiantesGet);

router.get('/:matricula', estudiantesGetById);

router.post('/', estudiantesCreate);

router.put('/:id', [validarJWT], estudiantesUpdate);

router.patch('/:id', [validarJWT], estudiantesUpdatePass);

router.delete('/:id', [validarJWT], estudiantesDelete);


module.exports = router;
