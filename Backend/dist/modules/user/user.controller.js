import { UserRepository } from "./user.repository.js";
const repo = new UserRepository();
export class UserController {
    async updateProfile(req, res) {
        const user = await repo.updateName(req.user.id, req.body.name);
        res.status(200).json(user);
    }
}
//# sourceMappingURL=user.controller.js.map