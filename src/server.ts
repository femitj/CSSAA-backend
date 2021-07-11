import '@babel/polyfill';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import dotenv from 'dotenv';
// import router from './routes';

dotenv.config();

const { NODE_ENV } = process.env;
const app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cors());

app.get('/', (req, res) => {
  return res.send('Welcome to CSSAA API');
});

// app.use('/api', router);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`App is listening to port: ${port}`));
