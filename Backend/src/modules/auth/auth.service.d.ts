import type { User } from "../../generated/prisma/index.js";
export declare class AuthService {
    register(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<{
        user: User;
        token: string;
    }>;
    login(email: string, password: string): Promise<{
        user: User;
        token: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map