import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const token = jwt.sign(
        { userId }, // payload
        process.env.JWT_SECRET, // secret
        { expiresIn: '7d' } // options
    );

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        secure: process.env.NODE_ENV === 'production'
    });

    return token;
};
