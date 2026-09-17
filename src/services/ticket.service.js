import * as ticketRepository from '../repositories/ticket.repository.js';

const ALLOWED_TRANSITIONS = {
  open: ['in_progress'],
  in_progress: ['resolved'],
  resolved: ['closed'],
  closed: ['open'], 
};

function assertValidTransition(currentStatus, newStatus) {
  const allowed = ALLOWED_TRANSITIONS[currentStatus] || [];
  if (!allowed.includes(newStatus)) {
    const err = new Error(
      `Cannot transition ticket from '${currentStatus}' to '${newStatus}'`
    );
    err.statusCode = 400;
    throw err;
  }
}

export async function getAllTickets() {
  return ticketRepository.findAll();
}

export async function getTicketById(id) {
  const ticket = await ticketRepository.findById(id);
  if (!ticket) {
    const err = new Error('Ticket not found');
    err.statusCode = 404;
    throw err;
  }
  return ticket;
}

export async function createTicket(data) {

  const { status, ...rest } = data;
  return ticketRepository.create({ ...rest, status: 'open' });
}

export async function updateTicketStatus(id, newStatus) {
  const ticket = await getTicketById(id);
  assertValidTransition(ticket.status, newStatus);
  return ticketRepository.update(id, { status: newStatus });
}

export async function updateTicket(id, data) {

  const { status, ...rest } = data;
  const updated = await ticketRepository.update(id, rest);
  if (!updated) {
    const err = new Error('Ticket not found');
    err.statusCode = 404;
    throw err;
  }
  return updated;
}

export async function deleteTicket(id) {
  const deleted = await ticketRepository.remove(id);
  if (!deleted) {
    const err = new Error('Ticket not found');
    err.statusCode = 404;
    throw err;
  }
  return deleted;
}