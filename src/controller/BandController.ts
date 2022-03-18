import { Request, Response } from "express"
import { BandBusiness } from "../business/BandBusiness"
import { BandDatabase } from "../data/BandDatabase"
import { RegisterBandDTO } from "../model/Band"

export class BandController {
    private bandBusiness: BandBusiness
    constructor() {
        this.bandBusiness = new BandBusiness(
            new BandDatabase()
        )
    }
    register = async (req: Request, res: Response) => {
        const {name, music_genre, responsible} = req.body
        const token = req.headers.authorization as string
        const input: RegisterBandDTO = {
            name,
            music_genre,
            responsible
        }
        try {
            const result = await this.bandBusiness.register(input, token)
            if(!result){
                throw new Error("Falha ao cadastrar banda no banco de dados")
            }
            res.status(201).send({message: "Sucesso, banda cadastrada"})
        } catch (error: any) {
            switch(error.message){
                case "Preencha todos os campos":
                    res.status(401).send(error.message)
                    break
                case "Token inválido":
                    res.status(401).send(error.message)
                    break
                case "Esta banda já existe":
                    res.status(409).send(error.message)
                    break
                default:
                    res.status(400).send(error.message)
            }
        }
    }
    findBandByIdOrName = async(req: Request, res: Response) => {
        const id = req.query.id as string
        const name = req.query.name as string
        const token = req.headers.authorization as string
        try {
            if(id){
                const result = await this.bandBusiness.findBandByIdOrName(token, id, name)
                if(!result){
                    throw new Error("Banda não encontrada")
                }
                res.status(200).send(result)
            }else if(name){
                const result = await this.bandBusiness.findBandByIdOrName(token, id, name)
                
                if(!result){
                    throw new Error("Banda não encontrada")
                }
                res.status(200).send(result)
            }
        } catch (error: any) {
            switch(error.message){
                case "Por favor informar o id da banda":
                    res.status(401).send(error.message)
                    break
                case "Banda não encontrada":
                    res.status(404).send(error.message)
                    break
                default:
                    res.status(400).send(error.message)
            }
        }
    }
}