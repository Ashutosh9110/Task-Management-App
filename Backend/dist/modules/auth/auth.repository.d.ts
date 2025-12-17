import type { User } from "../../generated/prisma/index.js";
export declare class AuthRepository {
    findByEmail(email: string): Promise<User | null>;
    createUser(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<User>;
}
//# sourceMappingURL=auth.repository.d.ts.map