import { IUser } from "../models/user.model";

class UserService {
    private users: IUser[];
    constructor() {
        this.users = [];
    }

    public findAll(): IUser[] {
        return this.users;
    }

    public create(user: IUser): void {
        this.users.push(user);
    }
}
