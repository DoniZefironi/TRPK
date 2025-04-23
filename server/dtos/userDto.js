class UserDto {
  constructor(user) {
    this.id = user.id_user; 
    this.username = user.username;
    this.email = user.email;
    this.role = user.role;
    this.permissions = user.permissions;
  }
}

module.exports = UserDto;