import * as ticketService from '../services/ticket.service.js';

export async function getAll(req, res, next) {
  try {
    const tickets = await ticketService.getAllTickets();
    res.json(tickets);
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const ticket = await ticketService.getTicketById(req.params.id);
    res.json(ticket);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const ticket = await ticketService.createTicket(req.body);
    res.status(201).json(ticket);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const ticket = await ticketService.updateTicket(req.params.id, req.body);
    res.json(ticket);
  } catch (err) {
    next(err);
  }
}

export async function updateStatus(req, res, next) {
  try {
    const ticket = await ticketService.updateTicketStatus(req.params.id, req.body.status);
    res.json(ticket);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    await ticketService.deleteTicket(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}