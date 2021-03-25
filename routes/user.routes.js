import express from 'express';
import userController from '../controller/user.controller.js';

const router = express.Router();

router.post('/user', userController.addUser);
router.get('/user', userController.getAllUsers);
router.get('/user/calc', userController.getCalculatedData);
router.delete('/user/:id', userController.deleteUser);

export default router;
