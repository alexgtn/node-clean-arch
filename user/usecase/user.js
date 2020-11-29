export default class UsersUsecase {
  userRepository

  constructor(repository) {
    this.userRepository = repository;
  }

  getUsers() {
    return this.userRepository.getUsers();
  }

  addUser(user) {
    return this.userRepository.addUser(user);
  }
}