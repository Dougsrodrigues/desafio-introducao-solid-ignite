import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser = new User();

    Object.assign(newUser, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(newUser);

    return newUser;
  }

  findById(id: string): User | undefined {
    const findUserById = this.users.find((user) => user.id === id);

    return findUserById;
  }

  findByEmail(email: string): User | undefined {
    const findUserByEmail = this.users.find((user) => user.email === email);

    return findUserByEmail;
  }

  turnAdmin(receivedUser: User): User {
    const userNewAdmin = receivedUser;

    userNewAdmin.admin = true;

    const findIndexUserInList = this.users.findIndex(
      (user) => user.id === userNewAdmin.id
    );

    this.users[findIndexUserInList] = userNewAdmin;

    return userNewAdmin;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
