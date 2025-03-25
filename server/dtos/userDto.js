module.exports = class UserDto {
    constructor(model) {
      this.id_user = model.id_user;
      this.username = model.username;
      this.email = model.email;
      this.role = model.role;
      this.permissions = model.permissions; // Информация о курсе
    }
  };
  