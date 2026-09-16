import sequelize from '../config/database.js';
import Category from './category.model.js';
import Ticket from './ticket.model.js';


Category.hasMany(Ticket, { foreignKey: 'category_id' });
Ticket.belongsTo(Category, { foreignKey: 'category_id' });

export { sequelize, Category, Ticket };