import express from 'express';
import categoryRoutes from './routes/category.routes.js';
import ticketRoutes from './routes/ticket.routes.js';
import errorHandler from './middlewares/errorHandler.js';


const app = express();

app.use(express.json());
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use("/categories", categoryRoutes);
app.use('/tickets', ticketRoutes);

app.use(errorHandler);

export default app;