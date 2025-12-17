import type { JwtPayload } from "jsonwebtoken";
export interface TokenPayload extends JwtPayload {
    userId: string;
}
export declare const signToken: (payload: TokenPayload) => string;
export declare const verifyToken: (token: string) => TokenPayload;
//# sourceMappingURL=jwt.d.ts.map