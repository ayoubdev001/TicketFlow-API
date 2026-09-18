import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../src/repositories/ticket.repository.js', () => ({
  findAll: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
}));

import * as ticketRepository from '../../src/repositories/ticket.repository.js';
import * as ticketService from '../../src/services/ticket.service.js';

describe('ticket.service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createTicket', () => {
    it('always creates the ticket with status "open", ignoring any status sent in', async () => {
      const input = { title: 'Login broken', priority: 'high', status: 'closed' };
      ticketRepository.create.mockResolvedValue({ id: 1, ...input, status: 'open' });

      await ticketService.createTicket(input);

      expect(ticketRepository.create).toHaveBeenCalledWith({
        title: 'Login broken',
        priority: 'high',
        status: 'open',
      });
    });
  });

  describe('updateTicketStatus — valid transitions', () => {
    const validCases = [
      ['open', 'in_progress'],
      ['in_progress', 'resolved'],
      ['resolved', 'closed'],
      ['closed', 'open'],
    ];

    it.each(validCases)('allows %s → %s', async (from, to) => {
      ticketRepository.findById.mockResolvedValue({ id: 1, status: from });
      ticketRepository.update.mockResolvedValue({ id: 1, status: to });

      const result = await ticketService.updateTicketStatus(1, to);

      expect(result.status).toBe(to);
      expect(ticketRepository.update).toHaveBeenCalledWith(1, { status: to });
    });
  });

  describe('updateTicketStatus — invalid transitions', () => {
    const invalidCases = [
      ['open', 'closed'],     
      ['open', 'resolved'],
      ['in_progress', 'closed'],
      ['in_progress', 'open'],  
      ['resolved', 'open'],
      ['resolved', 'in_progress'],
      ['closed', 'in_progress'],
      ['closed', 'resolved'],
    ];

    it.each(invalidCases)('rejects %s → %s', async (from, to) => {
      ticketRepository.findById.mockResolvedValue({ id: 1, status: from });

      await expect(ticketService.updateTicketStatus(1, to)).rejects.toMatchObject({
        statusCode: 400,
      });

      expect(ticketRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('updateTicketStatus — ticket not found', () => {
    it('throws a 404 when the ticket does not exist', async () => {
      ticketRepository.findById.mockResolvedValue(null);

      await expect(ticketService.updateTicketStatus(999, 'in_progress')).rejects.toMatchObject({
        statusCode: 404,
      });
    });
  });
});