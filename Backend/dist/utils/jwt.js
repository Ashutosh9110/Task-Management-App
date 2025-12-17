import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
export const signToken = (payload) => {
    const options = {};
    if (process.env.JWT_EXPIRES_IN) {
        options.expiresIn = process.env.JWT_EXPIRES_IN;
    }
    return jwt.sign(payload, JWT_SECRET, options);
};
export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
//# sourceMappingURL=jwt.js.map