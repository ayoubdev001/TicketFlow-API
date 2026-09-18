import * as categoryRepository from '../repositories/category.repository.js';

export async function getAllCategories() {
  return categoryRepository.findAll();
}

export async function getCategoryById(id) {
  const category = await categoryRepository.findById(id);
  if (!category) {
    const err = new Error('Category not found');
    err.statusCode = 404;
    throw err;
  }
  return category;
}

export async function createCategory(data) {
  return categoryRepository.create(data);
}

export async function updateCategory(id, data) {
  const updated = await categoryRepository.update(id, data);
  if (!updated) {
    const err = new Error('Category not found');
    err.statusCode = 404;
    throw err;
  }
  return updated;
}

export async function deleteCategory(id) {
  const deleted = await categoryRepository.remove(id);
  if (!deleted) {
    const err = new Error('Category not found');
    err.statusCode = 404;
    throw err;
  }
  return deleted;
}