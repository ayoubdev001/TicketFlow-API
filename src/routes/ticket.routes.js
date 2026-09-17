import express from 'express';
import * as ticketController from '../controllers/ticket.controller.js';
import validate from '../middlewares/validate.js';
import { createTicketSchema, updateTicketSchema, updateStatusSchema } from '../validators/ticket.validator.js';


const router = express.Router();

router.get('/', ticketController.getAll);
router.get('/:id', ticketController.getById);
router.post('/', validate(createTicketSchema), ticketController.create);
router.put('/:id', validate(updateTicketSchema), ticketController.update);
router.patch('/:id/status', validate(updateStatusSchema), ticketController.updateStatus);
router.delete('/:id', ticketController.remove);

export default router;