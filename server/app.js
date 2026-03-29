import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import router from './route/listRouter.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);


const PORT = 8080;
app.listen(PORT);
console.log(`Your server is running on PORT ${PORT}`); 
