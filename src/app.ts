import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import PersonError from './interfaces/error.interface';
import loginRouter from './routes/login.router';
import orderRouter from './routes/order.router';
import productRouter from './routes/product.router';
import userRouter from './routes/user.router';

const app = express();

app.use(express.json());

app.use('/login', loginRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);

app.use((err: PersonError, _req: Request, res: Response, _next: NextFunction) => {
  const { message, code } = err;

  switch (true) {
    case message.includes('required'): res.status(400).json({ message });
      break;
    case message.includes('invalid'): res.status(401).json({ message });
      break;
    case message.includes('string'): res.status(422).json({ message });
      break;
    case message.includes('oken'): res.status(401).json({ message });
      break;
    default: res.status(code).json({ message });
  }
});

export default app;
