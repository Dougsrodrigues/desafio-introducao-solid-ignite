import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const findUserById = this.usersRepository.findById(user_id);

    if (!findUserById) {
      throw new Error("This user does not exist");
    }

    const newUserTurnedAdm = this.usersRepository.turnAdmin(findUserById);

    return newUserTurnedAdm;
  }
}

export { TurnUserAdminUseCase };
