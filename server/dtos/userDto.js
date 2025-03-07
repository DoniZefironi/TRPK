module.exports = class UserDto {
    email;
    id;
    username;
    role;
    permissions

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.username = model.username;
        this.role = model.role;
        this.permissions = model.permissions
        }
}