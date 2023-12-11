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

router.put('/:matricula', [validarJWT], estudiantesUpdate);

router.patch('/:matricula', [validarJWT], estudiantesUpdatePass);

router.delete('/:matricula', [validarJWT], estudiantesDelete);


module.exports = router;
