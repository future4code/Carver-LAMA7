export type SignupInputDTO = {
    name: string,
    email: string,
    password: string,
    role: USER_ROLES
}

export type LoginInputDTO = {
    email: string,
    password: string
}

export enum USER_ROLES{
    ADMIN = "ADMIN",
    NORMAL = "NORMAL"
}

export class User{
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLES
    ){}
    static toUserModel(data: any): User {
        return new User(data.id, data.name, data.email, data.password, data.role)
    }
    public getId(){
        return this.id
    }
    public getName(){
        return this.name
    }
    public getEmail(){
        return this.email
    }
    public getPassword(){
        return this.password
    }
    public getRole(){
        return this.role
    }
}