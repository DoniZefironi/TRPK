const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.get('/:course', groupController.getAllGroups);

router.get('/:course/:id', groupController.getGroup);

router.post('/', groupController.createGroup);

router.put('/:course/:id', groupController.updateGroup);

router.delete('/:course/:id', groupController.deleteGroup);

router.post('/:course/:id/members', groupController.addMember);

router.get('/:course/:id/members', groupController.getMembers);

router.put('/:course/:id/members/:userId', groupController.updateMember);

router.delete('/:course/:id/members/:userId', groupController.removeMember);

module.exports = router;
