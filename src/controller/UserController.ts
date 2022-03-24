import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserDatabase } from "../data/UserDatabase"
import { LoginInputDTO, SignupInputDTO } from "../model/User"

export class UserController {
    private userBusiness: UserBusiness
    constructor() {
        this.userBusiness = new UserBusiness(
            new UserDatabase()
        )
    }
    signup = async (req: Request, res: Response) => {
        const { name, email, password, role } = req.body
        const input: SignupInputDTO = {
            name,
            email,
            password,
            role
        }
        try {
            const token = await this.userBusiness.signup(input)
            res.status(201).send({ message: "Usuário cadastrado com sucesso", token })
        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send("Erro ao tentar fazer o signup")
        }
    }
    login = async (req: Request, res: Response) => {
        const { email, password } = req.body
        const input: LoginInputDTO = {
            email,
            password
        }
        try {
            const token = await this.userBusiness.login(input)
            res.status(200).send({ message: "Logado com sucesso!", token })
        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send("Erro ao tentar fazer login")
        }
    }
}