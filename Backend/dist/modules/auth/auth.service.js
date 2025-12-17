import { AuthRepository } from "./auth.repository.js";
import { hashPassword, comparePassword } from "../../utils/password.js";
import { signToken } from "../../utils/jwt.js";
const repo = new AuthRepository();
export class AuthService {
    async register(data) {
        const existingUser = await repo.findByEmail(data.email);
        if (existingUser) {
            throw new Error("Email already in use");
        }
        const hashedPassword = await hashPassword(data.password);
        const user = await repo.createUser({
            ...data,
            password: hashedPassword
        });
        const token = signToken({ userId: user.id });
        return { user, token };
    }
    async login(email, password) {
        const user = await repo.findByEmail(email);
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isValid = await comparePassword(password, user.password);
        if (!isValid) {
            throw new Error("Invalid credentials");
        }
        const token = signToken({ userId: user.id });
        return { user, token };
    }
}
//# sourceMappingURL=auth.service.js.map