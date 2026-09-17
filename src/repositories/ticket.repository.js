import { Ticket, Category } from '../models/index.js';


export async function findAll() {
  return Ticket.findAll({ include: Category });
}

export async function findById(id) {
  return Ticket.findByPk(id, { include: Category });
}

export async function create(data) {
  return Ticket.create(data);
}

export async function update(id, data) {
  const ticket = await Ticket.findByPk(id);
  if (!ticket) return null;
  return ticket.update(data);
}

export async function remove(id) {
  const ticket = await Ticket.findByPk(id);
  if (!ticket) return null;
  await ticket.destroy();
  return ticket;
}