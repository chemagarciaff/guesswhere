import express from 'express';
// import partidaRouter from './partidaRoutes.js';
import perteneceRouter from './perteneceRoutes.js';
import amigoRouter from './amigoRoutes.js';
import categoriaRouter from './categoriaRoutes.js';
import favoritoRouter from './favoritoRoutes.js';
import ubicacionRouter from './ubicacionRoutes.js';
import usuarioRouter from './usuarioRoutes.js';

const apiRouter = express.Router();

apiRouter.use('/ubicacion', ubicacionRouter);
apiRouter.use('/usuario', usuarioRouter);
apiRouter.use('/categoria', categoriaRouter);
apiRouter.use('/favorito', favoritoRouter);
apiRouter.use('/amigo', amigoRouter);
apiRouter.use('/pertenece', perteneceRouter);
// apiRouter.use('/partida', partidaRouter);

export default apiRouter;
