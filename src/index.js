import 'dotenv/config'
import express from 'express';
import cors from 'cors';

import roupaController from './controller/roupaController.js';

const servidor = express();
servidor.use(cors());
servidor.use(express.json());

servidor.use(roupaController);



const port = process.env.PORT;
servidor.listen(port, () => console.log(`API subiu na porta ${port}`));