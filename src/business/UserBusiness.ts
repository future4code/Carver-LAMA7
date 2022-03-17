import { LoginInputDTO, SignupInputDTO, User } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGeneration } from "../services/IdGenerator";
import { UserRepository } from "./UserRepository";

export class UserBusiness {
    private userDatabase: UserRepository
    private idGenerator: IdGeneration
    private hashManager: HashManager
    private authentication: Authenticator
    constructor(userDataImplementation: UserRepository) {
        this.userDatabase = userDataImplementation
        this.idGenerator = new IdGeneration()
        this.hashManager = new HashManager()
        this.authentication = new Authenticator()
    }
    signup = async (input: SignupInputDTO) => {
        const { name, email, password, role } = input

        const id = this.idGenerator.generateId()

        if (!name || !email || !password) {
            throw new Error("Campos vazios")
        }
        if (password.length < 6) {
            throw new Error("A senha deve ter no mínimo 6 caracteres")
        }
        const userExist = await this.userDatabase.findUserByEmail(email)
        if(userExist){
            throw new Error("Este e-mail já está cadastrado")
        }

        const hashedPassword = this.hashManager.createHash(password)

        const user = new User(
            id,
            name,
            email,
            hashedPassword,
            role
        )

        await this.userDatabase.insert(user)

        const token = this.authentication.generate({ id, role })

        return token
    }
    login = async (input: LoginInputDTO) => {
        const {email, password} = input

        if(!email || !password){
            throw new Error("Por favor preencha os campos 'e-mail' ou 'senha'")
        }
        if(password.length < 6){
            throw new Error("A senha deve ter no mínimo 6 caracteres")
        }
        const user = await this.userDatabase.findUserByEmail(email)
    
        if(!user){
            throw new Error("Este e-mail não existe")
        }
        const passwordIdCorrect = this.hashManager.compareHash(password, user.getPassword())

        if(!passwordIdCorrect){
            throw new Error("Senha inválida")
        }
        const token = this.authentication.generate({id: user.getId(), role: user.getRole()})

        return token
    }
    findUserById = async(id: string) => {

    }
}
