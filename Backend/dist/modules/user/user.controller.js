import { UserService } from "./user.service.js";
const service = new UserService();
export class UserController {
    async updateProfile(req, res) {
        const user = await service.updateProfile(req.user.id, req.body.name);
        res.status(200).json(user);
    }
    async getAllUsers(req, res) {
        const users = await service.getAllUsers();
        res.status(200).json(users);
    }
}
