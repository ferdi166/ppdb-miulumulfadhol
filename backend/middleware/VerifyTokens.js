import jwt from 'jsonwebtoken';

/**
 * Middleware untuk memeriksa token
 */
export const VerifyTokens = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ status: false, message: 'Token tidak ditemukan' });

    // Ambil token dari header (Format: Bearer token)
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ status: false, message: 'Token tidak valid' });

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret_key');
        req.userId = decoded.userId; // Set userId di request
        req.grupUser = decoded.grupUser; // Set grupUser di request
        next();
    } catch (error) {
        res.status(401).json({ status: false, message: 'Token tidak valid' });
    }
};