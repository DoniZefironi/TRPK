const Router = require('express');
const router = new Router();
const electiveController = require('../controllers/electiveInformaticsController');

router.post('/', electiveController.create);

router.get('/', electiveController.getAll);

router.get('/:id', electiveController.getOne);

router.put('/:id', electiveController.update);

router.delete('/:id', electiveController.delete);

router.post('/:id/participants', electiveController.addParticipant);

module.exports = router;