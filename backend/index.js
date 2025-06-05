import cors from 'cors';
import express from 'express';
import router from './routes/apiRoutes.js';



const app = express();
app.use(express.json());
app.use(cors());

app.use('/guesswhere', router);  // 👈 todas tus rutas bajo /api

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
