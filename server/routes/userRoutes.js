const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 

router.post('/register', userController.register); 
router.post('/login', userController.login); 
// ... other user-related routes ...
router.get('/all', userController.getAllUsers);
router.get('/:username', userController.getUserByUsername);
module.exports = router;