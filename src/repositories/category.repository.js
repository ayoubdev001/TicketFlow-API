import { Category } from '../models/index.js';


export async function findAll() {
  return Category.findAll();
}

export async function findById(id) {
  return Category.findByPk(id);
}

export async function create(data) {
  return Category.create(data);
}

export async function update(id, data) {
  const category = await Category.findByPk(id);
  if (!category) return null;
  return category.update(data);
}

export async function remove(id) {
  const category = await Category.findByPk(id);
  if (!category) return null;
  await category.destroy();
  return category;
}