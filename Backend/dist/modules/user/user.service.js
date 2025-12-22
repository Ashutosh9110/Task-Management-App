import { UserRepository } from "./user.repository.js";
const repo = new UserRepository();
export class UserService {
    getAllUsers() {
        return repo.findAllPublic();
    }
    updateProfile(userId, name) {
        return repo.updateName(userId, name);
    }
}
