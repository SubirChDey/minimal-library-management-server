import express, { Application, Response, Request } from 'express';
import { Book } from './models/book.model';
import { booksRoutes } from './controllers/books.controller';
import { borrowRoutes } from './controllers/borrow.controller';
import cors from 'cors';

const app: Application = express();

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
}));

app.use(express.json())

app.use("/api/books", booksRoutes)
app.use("/api/borrow", borrowRoutes)


app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Library Management API');
})


export default app;