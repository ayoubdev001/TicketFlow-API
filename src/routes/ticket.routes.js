import express from 'express';
import * as ticketController from '../controllers/ticket.controller.js';

const router = express.Router();

router.get('/', ticketController.getAll);
router.get('/:id', ticketController.getById);
router.post('/', ticketController.create);
router.put('/:id', ticketController.update);
router.patch('/:id/status', ticketController.updateStatus);
router.delete('/:id', ticketController.remove);

export default router;