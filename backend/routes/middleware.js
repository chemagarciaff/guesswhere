import jwt from "jsonwebtoken";

const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ error: 'Token requerido' });

    const token = authHeader.split(' ')[1]; // formato: "Bearer token123"

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_secreto_super_secreto');
        req.usuario = decoded; // añade info del token al request
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token inválido o expirado' });
    }
};
export default verificarToken;