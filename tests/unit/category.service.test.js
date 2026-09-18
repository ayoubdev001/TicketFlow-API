import { describe, it, expect, vi, beforeEach } from 'vitest';


vi.mock('../../src/repositories/category.repository.js', () => ({
  findAll: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
}));

import * as categoryRepository from '../../src/repositories/category.repository.js';
import * as categoryService from '../../src/services/category.service.js';

describe('category.service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllCategories', () => {
    it('returns all categories from the repository', async () => {
      const fakeCategories = [{ id: 1, name: 'Billing' }];
      categoryRepository.findAll.mockResolvedValue(fakeCategories);

      const result = await categoryService.getAllCategories();

      expect(result).toEqual(fakeCategories);
      expect(categoryRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCategoryById', () => {
    it('returns the category when found', async () => {
      const fakeCategory = { id: 1, name: 'Billing' };
      categoryRepository.findById.mockResolvedValue(fakeCategory);

      const result = await categoryService.getCategoryById(1);

      expect(result).toEqual(fakeCategory);
    });

    it('throws a 404 error when not found', async () => {
      categoryRepository.findById.mockResolvedValue(null);

      await expect(categoryService.getCategoryById(999)).rejects.toMatchObject({
        message: 'Category not found',
        statusCode: 404,
      });
    });
  });

  describe('createCategory', () => {
    it('calls the repository with the given data', async () => {
      const input = { name: 'Billing' };
      const created = { id: 1, ...input };
      categoryRepository.create.mockResolvedValue(created);

      const result = await categoryService.createCategory(input);

      expect(categoryRepository.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(created);
    });
  });

  describe('deleteCategory', () => {
    it('throws 404 when the category does not exist', async () => {
      categoryRepository.remove.mockResolvedValue(null);

      await expect(categoryService.deleteCategory(999)).rejects.toMatchObject({
        statusCode: 404,
      });
    });
  });
});