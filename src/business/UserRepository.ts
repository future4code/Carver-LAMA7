import { User } from "../model/User";

export interface UserRepository{
    insert(user: User):Promise<User>
    findUserById(id: string): Promise<User | null>
    findUserByEmail(email: string): Promise<User | null>
}