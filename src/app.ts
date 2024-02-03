import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import router from './app/routes';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFound';
const app: Application = express();

// parser
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: 'https://fastidious-croquembouche-7527ef.netlify.app', credentials: true}));

app.use('/api/v1', router);
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.use(globalErrorHandler);
app.use(notFound);
export default app;
