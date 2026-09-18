import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

vi.mock('../../src/repositories/ticket.repository.js', () => ({
  findAll: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
}));

const ticketRepository = await import('../../src/repositories/ticket.repository.js');
const { default: app } = await import('../../src/app.js');

describe('Ticket routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /tickets', () => {
    it('creates a ticket with status "open" and returns 201', async () => {
      ticketRepository.create.mockResolvedValue({
        id: 1,
        title: 'Login broken',
        priority: 'high',
        status: 'open',
      });

      const res = await request(app)
        .post('/tickets')
        .send({ title: 'Login broken', priority: 'high' });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('open');
    });

    it('returns 400 when title is missing', async () => {
      const res = await request(app)
        .post('/tickets')
        .send({ priority: 'high' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Validation failed');
    });
  });

  describe('PATCH /tickets/:id/status', () => {
    it('allows a valid transition and returns 200', async () => {
      ticketRepository.findById.mockResolvedValue({ id: 1, status: 'open' });
      ticketRepository.update.mockResolvedValue({ id: 1, status: 'in_progress' });

      const res = await request(app)
        .patch('/tickets/1/status')
        .send({ status: 'in_progress' });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('in_progress');
    });

    it('rejects an invalid transition with 400', async () => {
      ticketRepository.findById.mockResolvedValue({ id: 1, status: 'open' });

      const res = await request(app)
        .patch('/tickets/1/status')
        .send({ status: 'closed' });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/Cannot transition/);
    });

    it('rejects an invalid status value with 400 from validation', async () => {
      const res = await request(app)
        .patch('/tickets/1/status')
        .send({ status: 'archived' }); // not in the enum

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Validation failed');
    });

    it('returns 404 when the ticket does not exist', async () => {
      ticketRepository.findById.mockResolvedValue(null);

      const res = await request(app)
        .patch('/tickets/999/status')
        .send({ status: 'in_progress' });

      expect(res.status).toBe(404);
    });
  });

  describe('GET /tickets/:id', () => {
    it('returns 200 with the ticket when found', async () => {
      ticketRepository.findById.mockResolvedValue({ id: 1, title: 'Login broken', status: 'open' });

      const res = await request(app).get('/tickets/1');

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(1);
    });

    it('returns 404 when not found', async () => {
      ticketRepository.findById.mockResolvedValue(null);

      const res = await request(app).get('/tickets/999');

      expect(res.status).toBe(404);
    });
  });
});