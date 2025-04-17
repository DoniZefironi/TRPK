const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.post('/:course/create', groupController.createGroup);
router.delete('/:course/delete/:id', groupController.deleteGroup);
router.post('/:course/add/:id', groupController.addMemberToGroup);
router.put('/:course/updateg/:id', groupController.updateGroup); 
router.put('/:course/updatem/:id/:userId', groupController.updateMember); 
router.get('/:course/all', groupController.getAllGroups); 
router.get('/:course/:id', groupController.getGroupMembers); 

module.exports = router;
