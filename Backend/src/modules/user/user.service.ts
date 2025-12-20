import { UserRepository } from "./user.repository.js"

const repo = new UserRepository()

export class UserService {
  getAllUsers() {
    return repo.findAllPublic()
  }

  updateProfile(userId: string, name: string) {
    return repo.updateName(userId, name)
  }
}
